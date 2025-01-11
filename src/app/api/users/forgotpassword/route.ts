import { sendEmail } from "@/helpers/mailer";
import { connect } from "../../dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );

        
    }
    const userId = user._id
    //send reset email
    await sendEmail({email, emailType: "RESET", userId: userId})

    return NextResponse.json({message:"Reset email send successfully",success:true})
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
