import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

// Assuming registerPayment is defined elsewhere or imported
// import { registerPayment } from "./registerPayment";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const payload = await req.text();
    const res = JSON.parse(payload);

    const sig = req.headers.get("Stripe-Signature");

    const dateTime = new Date(res?.created * 1000).toLocaleDateString();
    const timeString = new Date(res?.created * 1000).toLocaleDateString();

    // Ensure registerPayment is defined or imported correctly
    const result = await registerPayment(
      res?.data?.object?.billing_details?.email, // email
      res?.data?.object?.amount, // amount
      JSON.stringify(res), // payment info
      res?.type, // type
      String(timeString), // time
      String(dateTime), // date
      res?.data?.object?.receipt_email, // email
      res?.data?.object?.receipt_url, // url
      JSON.stringify(res?.data?.object?.payment_method_details), // Payment method details
      JSON.stringify(res?.data?.object?.billing_details), // Billing details
      res?.data?.object?.currency // Currency
    );

    console.log("Result:", result);

    let event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    console.log("Event", event?.type);

    return NextResponse.json({ status: "success", event: event.type, response: res });
  } catch (error) {
    return NextResponse.json({ status: "Failed", error });
  }
}
