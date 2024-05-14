import nodemailer from "nodemailer";

export const sendEmail = async () => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: process.env.SMTP_MAIL_USERNAME,
      pass: process.env.SMTP_MAIL_PASSWORD
    }
  });
  const mailBody = `
  <h1>Your post is online, you can see now your blogpost in Strive Blog. Share it with people around the world. Thank You!</h1>`
  
  const mail = await transporter.sendMail({
    from: "Strive Blog <striveblog@ethereal.email>",
    to: "tutia@gmail.com",
    subject: "Account Created succesfully",
    html: mailBody
  })

  console.log(mail.messageId)
}