require("dotenv").config();
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../utils/auth');

const secret = process.env.JWT_SECRET;
const expiration = '2h';
 


router.post('/api/users/register', userController.createUser);
router.post('/api/users/login', userController.userLogin);
router.get('/api/users/me', authMiddleware, (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'You must be logged in to see this!' });
  }
 
  // Find user data and send it back
  User.findById(req.user._id)
    .select('-password')
    .then(user => res.json(user))
    .catch(err => res.status(500).json(err));
});

module.exports = router;