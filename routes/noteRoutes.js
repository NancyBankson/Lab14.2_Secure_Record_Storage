const router = require('express').Router();
const Note = require('../models/Note');
const { authMiddleware } = require('../utils/auth');

// Apply authMiddleware to all routes in this file
router.use(authMiddleware);

// GET /api/notes - Get all notes for the logged-in user
// THIS IS THE ROUTE THAT CURRENTLY HAS THE FLAW
router.get('/', authMiddleware, async (req, res) => {
  // This currently finds all notes in the database.
  // It should only find notes owned by the logged in user.
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'You must be logged in to see this!' });
    }

    const notes = await Note.find({ user: req.user });
    res.json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /api/notes - Create a new note
router.post('/', authMiddleware, async (req, res) => {
  try {
    // const { title, content } = req.body;
    console.log("made it this far")
    const note = await Note.create({
      // ...req.body,
      // The user ID needs to be added here
      user: req.user._id,
      title: req.body.title,
      content: req.body.content
    });
    console.log(note);
    res.status(201).json(note);

  //   const { title, content } = req.body;

  //   const newPost = await User.create({ title, content });
  //   res.status(201).json({ message: 'Post created successfully', newPost });
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT /api/notes/:id - Update a note
router.put('/:id', async (req, res) => {
  try {
    // This needs an authorization check
    if (!req.user) {
      return res.status(403).json({ message: "User is not authorized to update this note." });
    }
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!note) {
      return res.status(404).json({ message: 'No note found with this id!' });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE /api/notes/:id - Delete a note
router.delete('/:id', async (req, res) => {
  try {
    // This needs an authorization check
    if (!req.user) {
      return res.status(403).json({ message: "User is not authorized to update this note." });
    }
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'No note found with this id!' });
    }
    res.json({ message: 'Note deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;