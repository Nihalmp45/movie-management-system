import { connect } from "../../dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, newPassword } = reqBody;

    // Find the user by the reset token
    const user = await User.findOne({ forgotPasswordToken: token });

    if (!user || user.forgotPasswordTokenExpiry < Date.now()) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    // Update the user's password and clear the reset token
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({ message: "Password reset successful" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }), { status: 500 };
  }
}
