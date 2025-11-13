import Mailtemplate from "./_comps/Mailtemplate";

const order_delivered_mail_template = (username) => {
  const content = `<tr>
    <td style="padding: 30px; text-align: center;">
      <h1 style="font-size: 26px; font-weight: bold; color: #333; margin-bottom: 15px;">
        Your order has been delivered, ${username}! 📦
      </h1>

      <p style="font-size: 16px; color: #555; margin-bottom: 25px; line-height: 1.6;">
        We’re happy to let you know that your order has been <strong>successfully delivered</strong>.  
        We hope everything arrived in perfect condition and that you love your new purchase!
      </p>

      <a
        href="https://urbanfryhomes.com/account"
        style="
          background-color: #007bff;
          color: #fff;
          padding: 14px 30px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: bold;
          display: inline-block;
          margin-bottom: 25px;
        "
      >
        View Your Order
      </a>

      <p style="font-size: 16px; color: #555; margin-bottom: 25px; line-height: 1.6;">
        Your feedback means a lot to us.  
        If you have a moment, please consider sharing your experience or leaving a quick review — it helps us improve and inspires others!
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
          margin-bottom: 25px;
        "
      >
        Leave a Review
      </a>

      <p style="font-size: 14px; color: #777;">
        Thank you for shopping with <strong>Urbanfry Homes</strong>.  
        We look forward to serving you again soon!
      </p>
    </td>
  </tr>`;

  return Mailtemplate("Your Order Has Been Delivered!", content);
};

export default order_delivered_mail_template;
