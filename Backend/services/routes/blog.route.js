import { Router } from "express";
import Blog from "../models/blog.model.js";
import Comment from "../models/comments.model.js";
export const blogRoute = Router();
import nodemailer from "nodemailer";
import cloudinaryMiddleware from "../middlewares/multer.js"
import { authMidd } from "../middlewares/auth.js";

blogRoute.get("/", async (req, res, next) => {
  try {
     const page = req.query.page || 1
    let blogs = await Blog.find(
      req.query.title ? { title: { $regex: req.query.title } } : {}
    )
      .limit(20)
      .skip(20 * (page - 1))
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: ["name", "lastName", "avatar"],
        },
        options: {
          limit: 2,
        },
      })
    res.send(blogs)
  } catch (error) {
    next(error)
  }
})
blogRoute.get("/:id", async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.params.id)
    res.send(blog)
  } catch (error) {
    next(error)
  }
})

blogRoute.put("/:id", async (req, res, next) => {
  try {
    let blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.send(blog)
  } catch (error) {
    next(error)
  }
})

blogRoute.patch("/:id/cover", cloudinaryMiddleware, async (req, res, next) => {
  try {
    let blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { cover: req.file.path },
      {
        new: true,
      }
    )
    res.send(blog)
  } catch (error) {
    next(error)
  }
})

blogRoute.delete("/:id", async (req, res, next) => {
  try {
    await Blog.deleteOne({
      _id: req.params.id,
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

blogRoute.get("/:id/comments", async (req, res, next) => {
  try {
    let post = await Blog.findById(req.params.id).populate({
      path: "comments",
      populate: {
        path: "author",
        select: ["name", "lastName", "avatar"],
      },
    })
    if (post) {
      res.send(post.comments)
    } else res.sendStatus(404)
  } catch (error) {
    next(error)
  }
})
blogRoute.post("/:id/comments", authMidd, async (req, res, next) => {
  try {
    let comm = new Comment({...req.body, author: req.user._id})
    await comm.save()

    await Blog.findByIdAndUpdate(req.params.id, {
      $push: {
        comments: comm._id,
      },
    })
    res.send(comm)
  } catch (error) {
    next(error)
  }
})
blogRoute.get("/:id/comments/:commentId", async (req, res, next) => {
  try {
    let comment = await Comment.findById(req.params.commentId).populate({
      path: "author",
      select: ["name", "lastName", "avatar"],
    })

    res.send(comment)
  } catch (error) {
    next(error)
  }
})
blogRoute.put("/:id/comments/:commentId", async (req, res, next) => {
  try {
    let comment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      req.body,
      { new: true }
    )

    res.send(comment)
  } catch (error) {
    next(error)
  }
})
blogRoute.delete("/:id/comments/:commentId", async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)

    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

blogRoute.post("/", async (req, res, next) => {
  try {
    let blog = await Blog.create(req.body)
   /*/ const sendEmail = async () => {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_MAIL_USERNAME,
          pass: process.env.SMTP_MAIL_PASSWORD
        }
      });
      const mailBody = `
      <h4>Your post "${req.body.title}" is online, you can see now your blogpost in Strive Blog and share it with people around the world. Thank You!</h4>`
      const mail = await transporter.sendMail({
        from: "Strive Blog <alanis.brown@ethereal.email>",
        to: "puto@gmail.com",
        subject: "BlogPost Created succesfully",
        html: mailBody
      })
    
      console.log(mail.messageId)
    }
    if (res.send(blog)) {
      sendEmail()
    }  /*/ res.send(blog)
  } catch (error) {
    next(error)
  }
})