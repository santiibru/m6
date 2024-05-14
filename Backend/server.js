import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import { authorRoute } from "./services/routes/author.route.js"
import { blogRoute } from "./services/routes/blog.route.js";
import cors from "cors";
import { badRequestHandler, genericErrorHandler, notfoundHandler, unauthorizedHandler } from "./services/middlewares/error.js"
import { loginRoute } from "./services/routes/login.route.js";
import { registerRoute } from "./services/routes/register.route.js";
import { authMidd } from "./services/middlewares/auth.js";
config(); 

const app = express()
const port = 3001
app.use(cors());


app.use(express.json());

app.use("/login", loginRoute)
app.use("/register", registerRoute)
app.use("/authors", authorRoute);
app.use("/blog", blogRoute)

app.use(badRequestHandler)
app.use(unauthorizedHandler)
app.use(notfoundHandler)
app.use(genericErrorHandler)

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello World!')
})

const initServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("The server is connected to mongodb")
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  } catch (error) {
    console.log("Connection Failed Error: ", error)
  }
}  

initServer();