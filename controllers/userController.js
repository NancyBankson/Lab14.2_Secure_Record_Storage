const User = require("../models/User");
const jwt = require('jsonwebtoken');
const signToken = require('../utils/auth')

async function createUser(req, res) {
    try {
        const { username, email, password } = req.body;
        const userExists = await User.exists({ email: email });
        if (userExists) {
            return req.status(400).json({ message: 'User with that email already exists.' });
        }
        const newUser = await User.create({ username, email, password });
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(400).json({ error: "Failed to create user.", details: error.message });
    }
    // try {
    //     const user = await User.create(req.body);
    //     const token = signToken(user);
    //     res.status(201).json({ token, user });
    // } catch (err) {
    //     res.status(400).json(err);
    // }
}

async function userLogin(req, res) {
    try {
        // Example usage in a login route
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({ message: "Incorrect email or password" });
        }

        const correctPw = await user.isCorrectPassword(req.body.password);

        if (!correctPw) {
            return res.status(400).json({ message: "Incorrect email or password" });
        } else {
            const secret = process.env.JWT_SECRET;
            const expiration = '2h'; // Token will be valid for 2 hours

            // In your user login logic...
            const user = await User.findOne({ email: req.body.email });
            // ... (password verification logic) ...

            // The payload should contain non-sensitive user data
            const payload = {
                _id: user._id,
                username: user.username,
                email: user.email,
            };

            const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration });
            // Example token: eyJhbGciOi...

            // Send the token back to the client
            res.json({ token, user });
        }

        // If both are true, the user is authenticated!
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(400).json({ error: "Failed to authenticate user.", details: error.message });
    }
    // const user = await User.findOne({ email: req.body.email });

    // if (!user) {
    //     return res.status(400).json({ message: "Can't find this user" });
    // }

    // const correctPw = await user.isCorrectPassword(req.body.password);

    // if (!correctPw) {
    //     return res.status(400).json({ message: 'Wrong password!' });
    // }

    // const token = signToken(user);
    // res.json({ token, user });
}

module.exports = {
    createUser,
    userLogin
};