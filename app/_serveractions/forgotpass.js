"use server";
import { getcollection } from "../_connections/Mongodb";
import sendEmail from "../_connections/Sendmail";
import passwordreset from "../_mailtemplate/passwordreset";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function sendforgotmail(email) {
  try {
    const { userscollection } = await getcollection();
    const user = await userscollection.findOne({ email });
    if (!user) return { status: 400, message: "User not found!" };

    const token = jwt.sign({ email }, process.env.jwt_secret, {
      expiresIn: "5m",
    });

    const emailtemplate = passwordreset(
      `https://altorganisers.com/account/forgotpassword?user=${token}`
    );
    await sendEmail("Password Reset", email, emailtemplate);

    return { status: 200, message: "Please check your mailbox" };
  } catch (error) {
    return { status: 500, message: "Server error" };
  }
}

export async function resetpassword(token, newpassword) {
  try {
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.jwt_secret);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return { status: 400, message: "Password reset link expired!" };
      }
      return { status: 400, message: "Invalid token." };
    }

    if (!decoded || !decoded.email) {
      return { status: 400, message: "Invalid or expired token." };
    }

    const { userscollection } = await getcollection();
    const user = await userscollection.findOne({ email: decoded.email });
    if (!user) return { status: 400, message: "User not found!" };

    const hashedPassword = await bcrypt.hash(newpassword, 10);
    await userscollection.updateOne(
      { email: decoded.email },
      { $set: { password: hashedPassword } }
    );

    return { status: 200, message: "Password reset successfully" };
  } catch (error) {
    return { status: 500, message: "Server error" };
  }
}
