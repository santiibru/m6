import { Router } from "express"
import Author from "../models/author.model.js"
import bcrypt from "bcryptjs"
export const registerRoute = Router()

registerRoute.post("/", async (req, res, next) => {
  try {
    let author = await Author.create({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10),
    })
   /* const sendEmail = async () => {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_MAIL_USERNAME,
          pass: process.env.SMTP_MAIL_PASSWORD
        }
      });
      const mailBody = `
      <h4>Hey, "${req.body.name}" welcome to StriveBlog start now to create your blogs and share it with people around the world. Thank You!</h4>`
      const mail = await transporter.sendMail({
        from: "Strive Blog <alanis.brown@ethereal.email>",
        to: req.body.mail,
        subject: "Welcome to StriveBlog",
        html: mailBody
      })
    
      console.log(mail.messageId)
  }
    if (res.send(author)) {
      sendEmail()
    }
  /*/res.send(author)
  } catch (error) {
    next(error)
  }
})