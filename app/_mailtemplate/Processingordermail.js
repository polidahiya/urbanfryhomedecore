import Mailtemplate from "./_comps/Mailtemplate";

const order_processing_mail_template = (username) => {
  const content = `<tr>
                <td style="padding: 30px; text-align: center;">
                  <h1 style="font-size: 26px; font-weight: bold; color: #333; margin-bottom: 15px;">
                    Thanks for your order, ${username}! 🙌
                  </h1>

                  <p style="font-size: 16px; color: #555; margin-bottom: 25px; line-height: 1.6;">
                    We’re happy to let you know that your order has been <strong>successfully placed</strong> and is now moving into the <strong>processing stage</strong>.
                  </p>

                  <p style="font-size: 16px; color: #555; margin-bottom: 25px; line-height: 1.6;">
                    Our team is carefully preparing your items for shipment.  
                    Delivery usually takes <strong>12–15 days</strong>, depending on your location.
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
                    View Your Order Details
                  </a>

                  <p style="font-size: 14px; color: #777;">
                    We’ll send another update once your order has been shipped.  
                    Thank you for choosing Urbanfry Homes!
                  </p>

                 
                </td>
              </tr>`;
  return Mailtemplate("Your Order is Now Being Processed!", content);
};

export default order_processing_mail_template;
