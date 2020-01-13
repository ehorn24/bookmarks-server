const express = require("express");
const uuid = require("uuid/v4");
const logger = require("./logger");
const bookmarks = require("./store");

const bookmarkRouter = express.Router();
const bodyParser = express.json();

bookmarkRouter
  .route("/bookmarks")
  .get((req, res) => {
    res.json(bookmarks);
  })
  .post(bodyParser, (req, res) => {
    const { title, url, rating, description } = req.body;
    if (!title) {
      logger.error("Title is required.");
      return res.status(400).send("Title is required.");
    }
    if (!url) {
      logger.error("URL is required.");
      return res.status(400).send("URL is required.");
    }
    if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
      logger.error("Invalid rating. Rating must be a number from 0 to 5.");
    }

    const bookmark = { id: uuid(), title, url, rating, description };
    console.log(bookmarks);
    bookmarks.push(bookmark);
    logger.info(`Bookmark with id ${bookmark.id} created.`);
    res
      .status(201)
      .location(`http://localhost:8000/bookmarks/${bookmark.id}`)
      .json(bookmark);
  });

bookmarkRouter
  .route("/bookmarks/:id")
  .get((req, res) => {
    const { id } = req.params;
    const bookmark = bookmarks.find(b => b.id == id);
    if (!bookmark) {
      logger.error(`Bookmark with id ${id} not found.`);
      return res.status(404).send("Bookmark not found.");
    }
    res.json(bookmark);
  })
  .delete((req, res) => {
    const { id } = req.params;
    const bookmarkIndex = bookmarks.findIndex(b => b.id === id);
    if (bookmarkIndex === -1) {
      logger.error(`Bookmark with id ${id} not found.`);
      return res.status(404).send("Bookmark not found.");
    }
    bookmarks.splice(bookmarkIndex, 1);
    logger.info(`Bookmark with ${id} has been deleted.`);
    res
      .status(204)
      .send("Bookmark has been deleted.")
      .end();
  });

module.exports = bookmarkRouter;
