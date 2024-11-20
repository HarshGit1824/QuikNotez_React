const express = require("express");
const router = express.Router();
var fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// MARK: 'ROUTE 1'
// Get All Notes using : GET "/api/notes/fetchallnotes" . login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// MARK: 'ROUTE 2'
// Add a new Notes using : POST "/api/notes/addnote" . login required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a Valid Title").isLength({ min: 3 }),
    body("description", "description must be atleast 5 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // It there are errors, retrun them bad Request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
