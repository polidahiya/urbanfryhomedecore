import Mailtemplate from "./_comps/Mailtemplate";

const order_shipped_mail_template = (username) => {
  const content = `<tr>
    <td style="padding: 30px; text-align: center;">
      <h1 style="font-size: 26px; font-weight: bold; color: #333; margin-bottom: 15px;">
        Great news, ${username}! 🎉
      </h1>

      <p style="font-size: 16px; color: #555; margin-bottom: 25px; line-height: 1.6;">
        Your order has been <strong>shipped</strong> and is on its way to you! 🚚  
        Our delivery partner has picked up your package and it’s now en route to your address.
      </p>

      <p style="font-size: 16px; color: #555; margin-bottom: 25px; line-height: 1.6;">
        You can track your shipment in real-time using the link below:
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
        Track Your Order
      </a>

      <p style="font-size: 16px; color: #555; margin-bottom: 25px; line-height: 1.6;">
        Expected delivery: <strong>3–7 business days</strong> depending on your location.
      </p>

      <p style="font-size: 14px; color: #777;">
        We hope you’re as excited as we are!  
        If you have any questions, feel free to <a href="mailto:urbanfryhomes@gmail.com" style="color: #007bff; text-decoration: none;">contact us</a>.
      </p>
    </td>
  </tr>`;

  return Mailtemplate("Your Order Has Been Shipped!", content);
};

export default order_shipped_mail_template;
