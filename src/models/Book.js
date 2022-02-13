const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    authors: {
        type: String,
        required: true
    },
    favourite: {
        type: String,
        required: false,
        default: ""
    },
    fileCover: {
        type: String,
        required: false,
        default: ""
    },
    fileName: {
        type: String,
        required: false,
        default: ""
    },
    fileBook: {
        type: String,
        required: false
    },
    comments: [
      {
        text: {
          type: String,
          required: true
        },
        date: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: false,
          default: 'Anonymous'
        }
      }
    ]
})

module.exports = model("Book", bookSchema);