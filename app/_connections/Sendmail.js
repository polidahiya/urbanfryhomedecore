"use server";

import nodemailer from "nodemailer";

const sendEmail = async (subject, to, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false, // Use false for 587 (non-SSL), true for SSL (465)
      auth: {
        user: process.env.brevo_user,
        pass: process.env.brevo_pass,
      },
    });

    const mailOptions = {
      from: `"Urbanfry Homes" <noreply@urbanfryhomes.com>`,
      to: to,
      subject: subject,
      html: html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
