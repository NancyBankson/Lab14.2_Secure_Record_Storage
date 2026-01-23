const router = require('express').Router();
// const Note = require('../models/Note');
const { authMiddleware } = require('../utils/auth');
const notesController = require('../controllers/notesController');

// Apply authMiddleware to all routes in this file
router.use(authMiddleware);

router.get('/', notesController.findNote);
router.post('/', notesController.createNote);
router.put('/:id', notesController.editNote);
router.delete('/:id', notesController.deleteNote);
router.post('/', notesController.findOneNote);

module.exports = router;