import { sendPhoneCode } from "@/lib/verification";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone || phone.replace(/\D/g, "").length < 10) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
    }

    // Generate and send code
    const code = await sendPhoneCode(phone);

    // Return success (code only shown in dev/console)
    return NextResponse.json({ success: true, phone });
  } catch (error) {
    console.error("Error sending phone code:", error);
    return NextResponse.json(
      { error: "Failed to send code" },
      { status: 500 }
    );
  }
}
