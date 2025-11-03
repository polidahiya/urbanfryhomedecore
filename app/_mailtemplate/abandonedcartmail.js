import { Socialaccounts } from "../commondata";

const abandoned_cart_mail_template = (cartLink) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Complete Your Purchase</title>
    </head>
    <body
      style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f9; color: #333;"
    >
      <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f4f4f9; padding: 40px;">
        <tr>
          <td align="center">
            <table
              width="600"
              border="0"
              cellpadding="0"
              cellspacing="0"
              style="
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
                overflow: hidden;
              "
            >
              <!-- Header -->
              <tr>
                <td style="position: relative">
                  <img
                    src="https://urbanfryhomes.com/mailimages/imagetapimage.jpg"
                    alt="Cart Reminder"
                    width="600"
                    height="200"
                    style="display: block; width: 100%; height: auto; border-bottom: 5px solid #f1f1f1;"
                  />
                  <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                    <img
                      src="https://urbanfryhomes.com/uiimages/logo.png"
                      alt="logo"
                      width="40"
                      height="40"
                    />
                  </div>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 30px; text-align: center;">
                  <h1 style="font-size: 26px; font-weight: bold; color: #333; margin-bottom: 15px;">
                    Hey there!, your cart misses you! 🛒
                  </h1>

                  <p style="font-size: 16px; color: #555; margin-bottom: 25px; line-height: 1.6;">
                    You added some amazing items to your cart but didn’t complete your checkout.  
                    Don’t worry — they’re still waiting for you!
                  </p>

                  <a
                    href="${cartLink}"
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
                    Return to Your Cart
                  </a>

                  <p style="font-size: 14px; color: #777; margin-bottom: 30px;">
                    Complete your purchase soon — your selected items might sell out!
                  </p>

                  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />

                  <p style="font-size: 15px; color: #555;">
                    Need help or have a question?  
                    <a href="mailto:urbanfryhomes@gmail.com" style="color: #007bff; text-decoration: none;">Contact us</a>.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td
                  style="
                    padding: 30px;
                    text-align: center;
                    background-color: #f9f9f9;
                    font-size: 14px;
                    color: #555;
                  "
                >
                  <p style="margin-bottom: 20px;">Stay connected with us:</p>

                  <a href="${
                    Socialaccounts.facebook
                  }" target="_blank" style="margin: 0 15px">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                      alt="Facebook"
                      width="30"
                      height="30"
                      style="display: inline-block"
                    />
                  </a>
                  <a href="${
                    Socialaccounts.insta
                  }" target="_blank" style="margin: 0 15px">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                      alt="Instagram"
                      width="30"
                      height="30"
                      style="display: inline-block"
                    />
                  </a>
                  <a href="${
                    Socialaccounts.twitter
                  }" target="_blank" style="margin: 0 15px">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                      alt="Twitter"
                      width="30"
                      height="30"
                      style="display: inline-block"
                    />
                  </a>

                  <p style="margin-top: 20px; font-size: 12px; color: #999;">
                    © ${new Date().getFullYear()} Urbanfry Homes. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};

export default abandoned_cart_mail_template;
