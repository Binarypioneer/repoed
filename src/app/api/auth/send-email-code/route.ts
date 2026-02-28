import { sendEmailCode } from "@/lib/verification";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Generate and send code
    const code = await sendEmailCode(email);

    // Return success (code only shown in dev/console)
    return NextResponse.json({ success: true, email });
  } catch (error) {
    console.error("Error sending email code:", error);
    return NextResponse.json(
      { error: "Failed to send code" },
      { status: 500 }
    );
  }
}
