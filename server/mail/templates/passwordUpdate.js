exports.passwordUpdate = (email, name) => {
    return `<!DOCTYPE html>
   <html>
   
   <head>
   <meta charset="UTF-8">
   <title>Password Update COnfirmation</title>
   <style>
    body {
        background-color: #f4f4f4;
        font-family: Arial, sans-serif;
        margin: 0;
        color: #333;
        padding: 0px;
    }

    .container {
        max-width: 600px;
        margin: 0 auto;
        padding :20px;
        text-center:center;
    }
    

    .logo {
        max-width: 600px;
        margin-bottom:20px;
    }


    .message {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
    }


    .body {
        font-size: 16px;
        margin-bottom: 20px;
    }


    .support {
        font-size: 14px;
        color: #999;
        margin-top: 20px;
    }


    .highlight {
        font-weight: bold;
    }
   </style>
   </head>

   <body>
    <div class="container">
        <a href="https://studynotion-edtech-project.vercel.app/">
        <img class="logo" src="https://i.ibb.co/7W8f1yK/Study-Notion-removebg-preview.png" alt="Study Notion Logo">
        </a>
        <div class="message">Password Updated Successfully</div>
        <div class="body">
            <p>Hey ${name}</p>
            <p>Your Password has been successfully updated for the mail <span class="highlight">${email}</span></p>
            <p></p>If you did not initiate this change, please contact our support team immediately.</p>
        </div>
        <div class="support">If you have any questions, feel free to reach out to our support team at
            <a href="mailto:support@studynotion.com">studynotion.com</a>
        </div>
    </div>
   </body>
   </html>`
}