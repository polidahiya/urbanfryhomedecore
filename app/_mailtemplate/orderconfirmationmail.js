import { Socialaccounts } from "../commondata";

const order_confiramtion_mail_template = (products, totalPrice, username) => {
  const productRows = products
    .map((product) => {
      return `
        <tr style="border-bottom: 1px solid #f1f1f1">
          <td
            style="
              padding: 12px;
              font-size: 14px;
              color: #555;
              text-align: left;
            "
          >
            <img
              src="${product.image}"
              alt="${product?.name}"
              width="50"
              height="50"
              style="display: inline-block; margin-right: 10px;"
            />
            ${product?.name}
          </td>
          <td
            align="center"
            style="padding: 12px; font-size: 14px; color: #555"
          >
            ${product.quantity}
          </td>
          <td
            align="right"
            style="padding: 12px; font-size: 14px; color: #555"
          >
            ₹${product.price}
          </td>
        </tr>
      `;
    })
    .join(""); // Join the array of rows into a single string

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Order Confirmation</title>
    </head>
    <body
      style="
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background-color: #f4f4f9;
        color: #333;
      "
    >
      <!-- Wrapper -->
      <table
        width="100%"
        border="0"
        cellpadding="0"
        cellspacing="0"
        style="background-color: #f4f4f9; padding: 40px"
      >
        <tr>
          <td align="center">
            <!-- Email Container -->
            <table
              width="600"
              border="0"
              cellpadding="0"
              cellspacing="0"
              style="
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                overflow: hidden;
              "
            >
              <!-- Hero Image Section -->
              <tr>
                <td style="position: relative">
                  <img
                    src="https://altorganisers.com/mailimages/imagetapimage.jpg"
                    alt="Order Confirmation"
                    width="600"
                    height="200"
                    style="
                      display: block;
                      width: 100%;
                      height: auto;
                      border-bottom: 5px solid #f1f1f1;
                    "
                  />
                  <div
                    style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
                  >
                    <img
                      src="https://altorganisers.com/uiimages/logo.png"
                      alt="logo"
                      width="120"
                      height="40"
                    />
                  </div>
                </td>
              </tr>

              <!-- Content Section -->
              <tr>
                <td
                  style="
                    padding: 30px;
                    text-align: center;
                    background-color: #ffffff;
                  "
                >
                  <h1
                    style="
                      font-size: 28px;
                      font-weight: bold;
                      color: #333;
                      margin-bottom: 20px;
                    "
                  >
                    Thankyou for your order, ${username}!
                  </h1>
                  <p style="font-size: 16px; color: #555; margin-bottom: 20px">
                    Hi ${username},
                  </p>
                  <p style="font-size: 16px; color: #555; margin-bottom: 30px">
                    We’re excited to let you know that we’ve received your order!
                    Below are your order details:
                  </p>

                  <!-- Order Details -->
                  <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    style="border-collapse: collapse; margin-bottom: 30px; border-top: 2px solid #f1f1f1;"
                  >
                    <tr
                      style="background-color: #f9f9f9; font-weight: bold; color: #333;"
                    >
                      <th
                        align="left"
                        style="padding: 12px; font-size: 16px; text-align: left"
                      >
                        Item
                      </th>
                      <th
                        align="center"
                        style="padding: 12px; font-size: 16px; text-align: center"
                      >
                        Quantity
                      </th>
                      <th
                        align="right"
                        style="padding: 12px; font-size: 16px; text-align: right"
                      >
                        Price
                      </th>
                    </tr>
                    ${productRows} <!-- Insert dynamic rows here -->
                  </table>

                  <!-- Total -->
                  <p
                    style="
                      font-size: 18px;
                      font-weight: bold;
                      color: #333;
                      text-align: right;
                      margin-bottom: 30px;
                    "
                  >
                    Total: ₹${totalPrice}
                  </p>

                  <p style="font-size: 14px; color: #777; margin-bottom: 30px">
                    Track your order here.
                    <a
                      href="https://altorganisers.com/account"
                      style="color: #007bff; text-decoration: none"
                      >Visit</a
                    >
                  </p>
                </td>
              </tr>

              <!-- Footer Section -->
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
                  <p style="margin-bottom: 20px">
                    Thank you for choosing us! Stay connected with us on social
                    media:
                  </p>

                  <!-- Social Media Icons -->
                  <a href="${Socialaccounts.facebook}" target="_blank" style="margin: 0 15px">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                      alt="Facebook"
                      width="30"
                      height="30"
                      style="display: inline-block"
                    />
                  </a>
                  <a href="${Socialaccounts.twitter}" target="_blank" style="margin: 0 15px">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                      alt="Twitter"
                      width="30"
                      height="30"
                      style="display: inline-block"
                    />
                  </a>
                  <a href="${Socialaccounts.insta}" target="_blank" style="margin: 0 15px">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                      alt="Instagram"
                      width="30"
                      height="30"
                      style="display: inline-block"
                    />
                  </a>
                </td>
              </tr>
            </table>
            <!-- End Email Container -->
          </td>
        </tr>
      </table>
      <!-- End Wrapper -->
    </body>
  </html>
  `;
};

export default order_confiramtion_mail_template;

{
  /* <a href="https://linkedin.com" target="_blank" style="margin: 0 15px">
<img
  src="https://cdn-icons-png.flaticon.com/512/733/733561.png"
  alt="LinkedIn"
  width="30"
  height="30"
  style="display: inline-block"
/>
</a> */
}
