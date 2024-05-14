import { Schema, model } from "mongoose"

const authorSchema = new Schema(
  {
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String ,
        required: true

    }, 
    email: {
        type: String ,
        required: true
    }, 
    password: {
      type: String,
      required: true
  },
    birthday: {
        type: String,
        required: false

    },
    avatar: {
        type: String,
        required: false

    }
  },
  { collection: "author" }
)

export default model("Author", authorSchema)