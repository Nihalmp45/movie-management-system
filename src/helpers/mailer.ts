import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
      console.log("Token received:", hashedToken);
      console.log("User found:", userId);
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "04d911e599ffe5",
        pass: "feeab5fe7ae47d",
      },
    });

    let htmlContent = '';
    let subject = '';

    if (emailType === "VERIFY") {
      subject = "Verify your email";
      htmlContent = `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email address. <br> 
      Or copy and paste the link below in your browser:<br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`;
    } 

    else if (emailType === "RESET") {
      subject = "Reset your password";
      htmlContent = `<p>Click <a href="${process.env.DOMAIN}/newPassword?token=${hashedToken}">here</a> to reset your password. <br> 
      Or copy and paste the link below in your browser:<br> ${process.env.DOMAIN}/newPassword?token=${hashedToken}</p>`;
    }


    const mailOptions = {
      from: "nihalmp45@gmail.com",
      to: email,
      subject: subject,
      html: htmlContent,
    };

    console.log("DOMAIN:", process.env.DOMAIN);

    transport.verify((error, success) => {
      if (error) {
        console.error("Transporter verification failed:", error);
      } else {
        console.log("Transporter is ready to send emails");
      }
    });

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
