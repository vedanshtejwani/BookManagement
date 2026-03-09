import express from "express";
import { Book } from "../models/backmodels.js";
const router = express.Router();

//Route for save a new book
router.post("/", async (req, res) => {
  try {
    // 1. Use optional chaining (?.) to prevent the "undefined" crash
    if (!req.body?.title || !req.body?.author || !req.body?.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);

    // 2. You MUST send a response back to the client
    return res.status(201).send(book);
  } catch (error) {
    console.log("ERROR:", error.message);
    // 3. Use 500 for server errors, not 200
    res.status(500).send({ message: error.message });
  }
});
//Route get request for find all the books form the database
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(201).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(401).send({ message: error.message });
  }
});
//Route to find the books by id
router.get("/:id", async (req, res) => {
  try {
    //My way
    // const books=await Book.find({id})
    //proffessional way
    const { id } = req.params;
    const books = await Book.findById(id);
    return res.status(201).json(books);
  } catch (error) {
    console.log(error.message);
    return res.status(401).send({ message: error.message });
  }
});

//Route to update the book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .send({ message: "All the required fields are not there" });
    } else {
      const { id } = req.params;
      const result = await Book.findByIdAndUpdate(id, req.body);

      if (!result) {
        return res.status(404).send({ message: "Book not found" });
      }
      return res.status(205).send({ message: "Book Updated Successfully" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(401).send({ message: error.message });
  }
});

//Route for deleting a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(400).send({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
  }
});

export default router;
