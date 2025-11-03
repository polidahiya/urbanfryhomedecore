function passwordreset(link) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Your Password</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        color: #333;
        padding: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
      }
      .container {
        max-width: 480px;
        background: #ffffff;
        padding: 30px;
      }
      h1 {
        font-size: 24px;
        color: #007bff;
        margin-bottom: 10px;
      }
      h2 {
        font-size: 20px;
        margin-bottom: 20px;
      }
      p {
        font-size: 16px;
        line-height: 1.5;
      }
      .btn {
        display: inline-block;
        background-color: #007bff;
        color: #ffffff;
        padding: 12px 20px;
        text-decoration: none;
        border-radius: 6px;
        font-size: 16px;
        margin-top: 20px;
        transition: background 0.3s;
      }
      .btn:hover {
        background-color: #0056b3;
      }
      .footer {
        margin-top: 20px;
        font-size: 14px;
        color: #777;
      }
      .footer a {
        color: #007bff;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Urbanfry Homes</h1>
      <h2>Reset Your Password</h2>
      <p>
        We received a request to reset your password for your <strong>Urbanfry Homes</strong> account.
        Click the button below to proceed. If you didn't request this, please ignore this email.
      </p>
      <a href="${link}" class="btn">Reset Your Password</a>
      <p class="footer">
        If the button above doesn’t work, copy and paste this link into your browser:
        <br />
        <a href="${link}">${link}</a>
      </p>
      <hr />
      <p class="footer">
        Need help? Contact us at
        <a href="mailto:urbanfryhomes@gmail.com">urbanfryhomes@gmail.com</a>
      </p>
    </div>
  </body>
</html>

    `;
}

export default passwordreset;
