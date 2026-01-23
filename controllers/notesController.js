const Note = require("../models/Note");

// GET /api/notes - Get all notes for the logged-in user
async function findNote(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'You must be logged in to see this!' });
        }

        const notes = await Note.find({ user: req.user });
        res.json(notes);
    } catch (err) {
        res.status(500).json(err);
    }
}

// POST /api/notes - Create a new note
async function createNote(req, res) {
    try {
        const note = await Note.create({
            user: req.user._id,
            title: req.body.title,
            content: req.body.content
        });
        console.log(note);
        res.status(201).json(note);
    } catch (err) {
        res.status(400).json(err);
    }
}

// PUT /api/notes/:id - Update a note
async function editNote(req, res) {
    try {
        // This needs an authorization check
        if (!req.user) {
            return res.status(403).json({ message: "User is not authorized to update this note." });
        } else {
            const record = await Note.findById(req.params.id);
            if (record.user.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'User not authorized!' });
            } else {
                const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
                if (!note) {
                    return res.status(404).json({ message: 'No note found with this id!' });
                }
                res.json(note);
            }
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// DELETE /api/notes/:id - Delete a note
async function deleteNote(req, res) {
    try {
        // This needs an authorization check
        if (!req.user) {
            return res.status(403).json({ message: "User is not authorized to update this note." });
        } else {
            const record = await Note.findById(req.params.id);
            if (record.user.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'User not authorized!' });
            } else {
                const note = await Note.findByIdAndDelete(req.params.id);
                if (!note) {
                    return res.status(404).json({ message: 'No note found with this id!' });
                }
                res.json({ message: 'Note deleted!' });
            }
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// Find single note by Id
async function findOneNote(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'You must be logged in to see this!' });
        } else {
            const record = await Note.findById(req.params.id);
            if (record.user.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'User not authorized!' });
            } else {
                const notes = await Note.findById(req.params.id);
                if (notes) {
                    res.json(notes);
                }
            }
        }

    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    findNote,
    createNote,
    editNote,
    deleteNote,
    findOneNote
};