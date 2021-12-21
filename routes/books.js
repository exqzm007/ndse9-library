const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const fileLoaderMiddleware = require("../middlewares/fileLoader");
const { resolve } = require("path");

const books = [
    {
        id: uuidv4(),
        title: "Book 1",
        description: "Description about book 1",
        authors: "John, Mark",
        favourite: "",
        fileCover: "cover 1",
        fileName: "Books name 1",
        fileBook: ""
    },
    {
        id: uuidv4(),
        title: "Book 2",
        description: "Description about book 2",
        authors: "Ann, Chris",
        favourite: "",
        fileCover: "cover 2",
        fileName: "Books name 2",
        fileBook: ""
    }
]

router.get("/", (req, res) => {
    if (books) {
        res.status(200).json(books);
    } else {
        res.status(500).json(null);
    }
})

router.get("/:id", (req, res) => {
    if (books) {
        const { id } = req.params;
        const book = books.find(x => x.id === id);
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json(null);
        }
    } else {
        res.status(500).json(null);
    }
})

router.post("/", fileLoaderMiddleware.single("fileBook"), (req, res) => {
    if (books) {
        const { title, description, authors, favourite, fileCover, fileName } = req.body;
        const bookToSave = {
            id: uuidv4(),
            title: title || "",
            description: description || "",
            authors: authors || "",
            favourite: favourite || "",
            fileCover: fileCover || "",
            fileName: fileName || "",
            fileBook: req.file?.filename || ""
        };
        books.push(bookToSave);
        res.status(201).json(bookToSave);
    } else {
        res.status(500).json(null);
    }
})

router.put("/:id", fileLoaderMiddleware.single("fileBook"), (req, res) => {
    if (books) {
        const { id } = req.params;
        const book = books.find(x => x.id === id);
        const { title, description, authors, favourite, fileCover, fileName } = req.body;
        if (book) {
            if (title) book.title = title;
            if (description) book.description = description;
            if (authors) book.authors = authors;
            if (favourite) book.favourite = favourite;
            if (fileCover) book.fileCover = fileCover;
            if (fileName) book.fileName = fileName;
            if (req.file?.filename) book.fileBook = req.file.filename;
            res.status(200).json(book);
        } else {
            res.status(404).json(null);
        }
    } else {
        res.status(500).json(null);
    }
})

router.delete("/:id", (req, res) => {
    if (books) {
        const { id } = req.params;
        const bookIndex = books.findIndex(x => x.id === id);
        if (bookIndex !== -1) {
            books.splice(bookIndex, 1);
            res.status(200).json("Ok");
        } else {
            res.status(404).json(null);
        }
    } else {
        res.status(500).json(null);
    }
})

router.get("/:id/download", (req, res) => {
    if (books) {
        const { id } = req.params;
        const book = books.find(x => x.id === id);
        if (book && book.fileBook) {
            const imgPath = resolve(__dirname, "../uploads", book.fileBook);
            res.download(imgPath, (err) => {
                if (err) res.status(404).json(null);
            });
        } else {
            res.status(404).json(null);
        }
    } else {
        res.status(500).json(null);
    }
})

module.exports = router;