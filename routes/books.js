const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const fileLoaderMiddleware = require("../middlewares/fileLoader");
const { resolve } = require("path");

const books = [
    {
        id: uuidv4(),
        title: "The Lost Apothecary",
        description: "A forgotten history. A secret network of women. A legacy of poison and revenge. Welcome to The Lost Apothecary...",
        authors: "John, Mark",
        favourite: "",
        fileCover: "cover 1",
        fileName: "Books name 1",
        fileBook: "lost-apothecary.jpg"
    },
    {
        id: uuidv4(),
        title: "Death at Greenway",
        description: "Irresistible... a Golden Age homage, an elegantly constructed mystery that on every page reinforces the message that everyone counts. -New York Times Book Review\n" +
            "\n" +
            "From the award-winning author of The Day I Died and The Lucky One, a captivating suspense novel about nurses during World War II who come to Agatha Christie's holiday estate to care for evacuated children, but when a body is discovered nearby, the idyllic setting becomes host to a deadly mystery.",
        authors: "Ann, Chris",
        favourite: "",
        fileCover: "cover 2",
        fileName: "Books name 2",
        fileBook: "death-at-greenway.jpg"
    }
]

router.get("/", (req, res) => {
    if (books) {
        res.render("pages/books/index", { title: "Books", books });
    } else {
        res.status(500).json({
            error: "An error occured while making request"
        });
    }
})

router
    .get("/create", (req, res) => {
        if (books) {
            res.render("pages/books/create", { title: "Create a book", book: {} });
        } else {
            res.status(500).json({
                error: "An error occured while making request"
            });
        }
    })
    .post("/create", fileLoaderMiddleware.single("fileBook"), (req, res) => {
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
            res.redirect("/books");
        } else {
            res.status(500).json({
                error: "An error occured while making request"
            });
        }
    })

router
    .get("/view/:id", (req, res) => {
        if (books) {
            const { id } = req.params;
            const book = books.find(x => x.id === id);
            if (book) {
                res.render("pages/books/view", { title: book.title || "View a book", book });
            } else {
                res.render("pages/404");
            }
        } else {
            res.status(500).json({
                error: "An error occured while making request"
            });
        }
    })
    .get("/update/:id", (req, res) => {
        if (books) {
            const { id } = req.params;
            const book = books.find(x => x.id === id);
            if (book) {
                res.render("pages/books/update", { title: book.title || "Update a book", book });
            } else {
                res.render("pages/404");
            }
        } else {
            res.status(500).json({
                error: "An error occured while making request"
            });
        }
    })
    .post("/update/:id", fileLoaderMiddleware.single("fileBook"), (req, res) => {
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
                res.render("pages/books/index", { title: "Books", books });
            } else {
                res.render("pages/404");
            }
        } else {
            res.status(500).json({
                error: "An error occured while making request"
            });
        }
    })
    .post("/delete/:id", (req, res) => {
        if (books) {
            const { id } = req.params;
            const bookIndex = books.findIndex(x => x.id === id);
            if (bookIndex !== -1) {
                books.splice(bookIndex, 1);
                res.redirect("/books");
            } else {
                res.render("pages/404");
            }
        } else {
            res.status(500).json({
                error: "An error occured while making request"
            });
        }
    })

router.get("/:id/download", (req, res) => {
    if (books) {
        const { id } = req.params;
        const book = books.find(x => x.id === id);
        if (book && book.fileBook) {
            const imgPath = resolve(__dirname, "../uploads", book.fileBook);
            res.download(imgPath, (err) => {
                if (err) res.render("pages/404");
            });
        } else {
            res.render("pages/404");
        }
    } else {
        res.status(500).json({
            error: "An error occured while making request"
        });
    }
})

module.exports = router;