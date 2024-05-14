import { Router } from "express"
import Author from "../models/author.model.js"
import { generateJWT } from "../middlewares/auth.js"
import bcrypt from "bcryptjs"
export const loginRoute = Router()

loginRoute.post("/", async ({ body }, res, next) => {
  try {
    let foundUser = await Author.findOne({
      email: body.email,
      id: body._id
    })
    if (foundUser) {
      const isMatching = await bcrypt.compare(body.password, foundUser.password)
      if (isMatching) {
        const token = await generateJWT({
          email: foundUser.email
        })

        res.send({ user: foundUser, token })
      } else res.status(400).send("Wrong password")
    } else res.status(400).send("User doesn't exist.")
  } catch (error) {
    next(error)
  }
})