import Mailheader from "./Mailheader";
import Mailfooter from "./Mailfooter";
function Mailtemplate(title, content) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
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
              ${Mailheader()}
              <!-- Content -->
              ${content}
              <td style="padding: 30px; text-align: center;">
               <hr style="border: none; border-top: 1px solid #eee; margin: 10px 0;" />
               <p style="font-size: 15px; color: #555;">
                 Need help or have a question?  
                 <a href="mailto:urbanfryhomes@gmail.com" style="color: #007bff; text-decoration: none;">Contact us</a>.
               </p>
              </td>
              <!-- Footer -->
              ${Mailfooter()}
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}

export default Mailtemplate;
