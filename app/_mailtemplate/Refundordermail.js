import Mailtemplate from "./_comps/Mailtemplate";

const refund_processed_mail_template = (username) => {
  const content = `<tr>
    <td style="padding: 30px; text-align: center;">
      <h1 style="font-size: 26px; font-weight: bold; color: #28a745; margin-bottom: 15px;">
        Your refund has been processed, ${username}! 💸
      </h1>

      <p style="font-size: 16px; color: #555; margin-bottom: 25px; line-height: 1.6;">
        We’ve completed processing your <strong>refund</strong> for the recent order.  
        The refunded amount has been initiated to your original payment method.
      </p>

      <p style="font-size: 16px; color: #555; margin-bottom: 25px; line-height: 1.6;">
        Please note that it may take <strong>5–7 business days</strong> for the amount to reflect in your account,  
        depending on your bank or payment provider.
      </p>

      <p style="font-size: 14px; color: #777; margin-bottom: 25px;">
        We’re sorry things didn’t work out this time, but we hope to see you again soon.  
        Explore our latest collections and find something you’ll love! 🛋️
      </p>

      <a
        href="https://urbanfryhomes.com"
        style="
          background-color: #28a745;
          color: #fff;
          padding: 12px 28px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: bold;
          display: inline-block;
        "
      >
        Continue Shopping
      </a>
    </td>
  </tr>`;

  return Mailtemplate("Your Refund Has Been Processed", content);
};

export default refund_processed_mail_template;
