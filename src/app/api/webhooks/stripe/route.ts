import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.text();

    // TODO: add Stripe signature verification later

    return NextResponse.json({ received: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Webhook error" },
      { status: 400 }
    );
  }
}
