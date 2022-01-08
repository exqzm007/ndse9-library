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
    }
})

module.exports = model("Book", bookSchema);