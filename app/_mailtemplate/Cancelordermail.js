import Mailtemplate from "./_comps/Mailtemplate";

const order_cancelled_mail_template = (username) => {
  const content = `<tr>
    <td style="padding: 30px; text-align: center;">
      <h1 style="font-size: 26px; font-weight: bold; color: #d9534f; margin-bottom: 15px;">
        Your order has been cancelled, ${username}.
      </h1>

      <p style="font-size: 16px; color: #555; margin-bottom: 25px; line-height: 1.6;">
        We wanted to let you know that your recent order has been <strong>cancelled</strong>.  
        If you didn’t request this or believe this was a mistake, please contact our support team right away.
      </p>

      <p style="font-size: 16px; color: #555; margin-bottom: 25px; line-height: 1.6;">
        If a payment was made, the refund (if applicable) will be processed within <strong>5–7 business days</strong>  
        to your original payment method.
      </p>

      <a
        href="mailto:urbanfryhomes@gmail.com"
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
        Contact Support
      </a>

      <p style="font-size: 14px; color: #777;">
        We’re sorry for the inconvenience and hope to serve you again soon.  
        You can always explore our latest collections and find something perfect for your home.
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
          margin-top: 20px;
        "
      >
        Continue Shopping
      </a>
    </td>
  </tr>`;

  return Mailtemplate("Your Order Has Been Cancelled", content);
};

export default order_cancelled_mail_template;
