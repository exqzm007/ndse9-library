const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const fileLoaderMiddleware = require("../middlewares/fileLoader");
const { resolve } = require("path");
const Book = require("../models/Book");

router.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        res.render("pages/books/index", { title: "Books", books });
    } catch (e) {
        res.status(500).json({
            error: "An error occured while getting books",
            errormessage: e.message
        });
    }
})

router
    .get("/create", (req, res) => {
        res.render("pages/books/create", { title: "Create a book", book: {} });
    })
    .post("/create", fileLoaderMiddleware.single("fileBook"), async (req, res) => {
        try {
            const { title, description, authors, favourite, fileCover, fileName } = req.body;
            const bookToSave = new Book({
                title: title || "",
                description: description || "",
                authors: authors || "",
                favourite: favourite || "",
                fileCover: fileCover || "",
                fileName: fileName || "",
                fileBook: req.file?.filename || ""
            });
            await bookToSave.save();
            res.redirect("/books");
        } catch (e) {
            res.status(500).json({
                error: "An error occured while creating a book",
                errormessage: e.message
            });
        }
    })

router
    .get("/view/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const book = await Book.findById(id);
            if (book) {
                res.render("pages/books/view", { title: book.title || "View a book", book });
            } else {
                res.render("pages/404");
            }
        } catch (e) {
            res.status(500).json({
                error: "An error occured while getting a book",
                errormessage: e.message
            });
        }
    })
    .get("/update/:id", async (req, res) => {
        try  {
            const { id } = req.params;
            const book = await Book.findById(id);
            if (book) {
                res.render("pages/books/update", { title: book.title || "Update a book", book });
            } else {
                res.render("pages/404");
            }
        } catch (e) {
            res.status(500).json({
                error: "An error occured while updating a book",
                errormessage: e.message
            });
        }
    })
    .post("/update/:id", fileLoaderMiddleware.single("fileBook"), async (req, res) => {
        try  {
            const { id } = req.params;
            const book = await Book.findById(id);
            const { title, description, authors, favourite, fileCover, fileName } = req.body;
            if (book) {
                if (title) book.title = title;
                if (description) book.description = description;
                if (authors) book.authors = authors;
                if (favourite) book.favourite = favourite;
                if (fileCover) book.fileCover = fileCover;
                if (fileName) book.fileName = fileName;
                if (req.file?.filename) book.fileBook = req.file.filename;
                await book.save();
                res.redirect("/books");
            } else {
                res.render("pages/404");
            }
        } catch (e) {
            res.status(500).json({
                error: "An error occured while updating a book",
                errormessage: e.message
            });
        }
    })
    .post("/delete/:id", async (req, res) => {
        try {
            const { id } = req.params;
            await Book.deleteOne({ _id: id });
            res.redirect("/books");
        } catch (e) {
            res.status(500).json({
                error: "An error occured while deleting a book",
                errormessage: e.message
            });
        }
    })

module.exports = router;