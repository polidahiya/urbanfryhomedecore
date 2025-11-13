import { Socialaccounts } from "@/app/commondata";

function Mailfooter() {
  return `
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
   `;
}

export default Mailfooter;
