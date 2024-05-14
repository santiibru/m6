import { Router } from "express"
import Author from "../models/author.model.js"
import nodemailer from "nodemailer"
import cloudinaryMiddleware from "../middlewares/multer.js"
export const authorRoute = Router()

authorRoute.get("/", async (req, res, next) => {
  try {
    let authors = await Author.find()
    res.send(authors)
  } catch (error) {
    next(error)
  }
})

authorRoute.get("/me", async (req, res, next) => {
  try {
    let author = await Author.findById(req.user.id)

    res.send(author)
  } catch (error) {
    next(error)
  }
})

authorRoute.get("/:id", async (req, res, next) => {
  try {
    let author = await Author.findById(req.params.id)
    res.send(author)
  } catch (error) {
    next(error)
  }
})

authorRoute.patch("/:id/avatar", cloudinaryMiddleware, async (req, res, next) => {
  try {
    let author = await Author.findByIdAndUpdate(
      req.params.id,
      {
        avatar: req.file.path,
      },
      { new: true }
    )
    res.send(author)
  } catch (error) {
    next(error)
  }
})

authorRoute.put("/:id", async (req, res, next) => {
  try {
    let author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.send(author)
  } catch (error) {
    next(error)
  }
})

authorRoute.delete("/:id", async (req, res, next) => {
  try {
    await Author.deleteOne({
      _id: req.params.id,
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

