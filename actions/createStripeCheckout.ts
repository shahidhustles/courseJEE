"use server";

import { baseUrl } from "@/lib/baseURL";
import stripe from "@/lib/stripe";
import { createEnrollment } from "@/sanity/lib/courses/createEnrollment";
import getCourseById from "@/sanity/lib/courses/getCourseById";
import { urlFor } from "@/sanity/lib/image";
import { createStudentIfNotExists } from "@/sanity/lib/student/createStudentIfNotExists";
import { clerkClient } from "@clerk/nextjs/server";

export async function createStripeCheckout(courseId: string, userId: string) {
  try {
    // 1. Query course details from Sanity
    const course = await getCourseById(courseId);
    //get user by userId
    const clerkUser = await (await clerkClient()).users.getUser(userId);
    const { emailAddresses, firstName, lastName, imageUrl } = clerkUser;
    const email = emailAddresses[0]?.emailAddress;

    if (!emailAddresses || !email) {
      throw new Error("User details not found");
    }

    if (!course) {
      throw new Error("Course not found");
    }

    // mid step - create user in sanity of it doesnt exists already
    const user = await createStudentIfNotExists({
      clerkId: userId,
      email: email || "",
      firstName: firstName || "",
      lastName: lastName || "",
      imageUrl: imageUrl || "",
    });

    if (!user) {
      throw new Error("User not found");
    }

    //2. Validate course data and prepare price for Stripe
    if (!course.price && course.price !== 0) {
      throw new Error("Course price is not set");
    }
    //for xx.99 price and bs
    const priceInCents = Math.round(course.price * 100);

    //if course is free, create enrollment adn redirect to course page (BYPASS STRIPE CHECKOUT)
    if (priceInCents === 0) {
      await createEnrollment({
        //here the student id is the id of the student in sanity not in clerk
        studentId: user._id,
        courseId: course._id,
        paymentId: "free",
        amount: 0,
      });
      return { url: `courses/${course.slug?.current}` };
    }

    //3. Create and configure Stripe checkout session with course details
    const { title, description, image, slug } = course;

    if (!title || !description || !image || !slug) {
      throw new Error("Course Data incomplete");
    }
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${baseUrl}/courses/${slug?.current}`,
      cancel_url: `${baseUrl}/courses/${slug?.current}?cancelled=true`,
      metadata: {
        courseId: course._id,
        userId: userId,
      },
      //item to be purchased
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: {
              name: title,
              description: description,
              images: [urlFor(image).url() || ""],
            },
            unit_amount: priceInCents,
          },
        },
      ],
    });

    //4. Return the checkout session URL for the client redirect
    return { url: session.url };
  } catch (error) {
    console.error("Error in createStripeCheckout: ", error);
    throw new Error("Failed to create checkout session");
  }
}
