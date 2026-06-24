import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { type NextRequest, type NextResponse } from "next/server";
import db from "@/utils/db";
import { formatDate } from "@/utils/format";
export const POST = async (req: NextRequest, res: NextResponse) => {
  // Get request headers to extract origin (used for redirect URL later)
  const requestHeaders = new Headers(req.headers);
  const origin = requestHeaders.get("origin");

  // Extract bookingId from the request body (sent from frontend)
  const { bookingId } = await req.json();

  // Find booking data from database by bookingId, including property info
  const booking = await db.booking.findUnique({
    where: { id: bookingId },
    include: {
      property: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  // If booking is not found, return 404
  if (!booking) {
    return Response.json(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  // Destructure necessary booking data
  const {
    totalNights,
    orderTotal,
    checkIn,
    checkOut,
    property: { image, name },
  } = booking;

  try {
    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      // Use embedded UI mode (for Stripe Elements / iframe)
      ui_mode: "embedded",
      // Add custom metadata (can be used later in webhook or confirmation page)
      metadata: { bookingId: booking.id },
      // Line items (i.e., the things the customer is paying for)
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd", // Currency for the transaction
            product_data: {
              name: `${name}`, // Name of the property
              images: [image], // Image URL of the property
              description: `Stay in this wonderful place for ${totalNights} nights, from ${formatDate(
                checkIn
              )} to ${formatDate(checkOut)}. Enjoy your stay!`, // Description shown in Stripe Checkout
            },
            unit_amount: orderTotal * 100, // Stripe requires amount in cents
          },
        },
      ],
      mode: "payment", // One-time payment
      // URL to redirect after payment is completed
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    });

    // Return the client secret to frontend (used to render Stripe embedded form)
    return Response.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.log(error);

    // Handle any errors during session creation
    return Response.json(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};
