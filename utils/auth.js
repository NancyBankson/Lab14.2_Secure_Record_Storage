const jwt = require('jsonwebtoken');
 
const secret = process.env.JWT_SECRET;
const expiration = '24h';
 
// module.exports = {
//   authMiddleware: function (req, res, next) 
  
  
  // {
  //   let token = req.body.token || req.query.token || req.headers.authorization;
 
  //   if (token) {
  //     token = token.split(' ').pop().trim();
  //   }
 
  //   if (!token) {
  //     return res.status(401).json({ message: 'You must be logged in to do that.' });
  //   }
 
  //   try {
  //     const { data } = jwt.verify(token, secret, { maxAge: expiration });
  //     req.user = data;
  //   } catch {
  //     console.log('Invalid token');
  //     return res.status(401).json({ message: 'Invalid token.' });
  //   }
 
  //   next();
  // },
//   signToken: function ({ username, email, _id }) {
//     const payload = { username, email, _id };
 
//     return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
//   },
// };

module.exports = {
   // Middleware to protect routes that require authentication
   authMiddleware: function (req, res, next) {
      console.log("HEADERS RECEIVED:", req.headers); // Debugging
      // Try to get token from request body, query params, or headers
      let token =
         (req.body && req.body.token) ||
         (req.query && req.query.token) ||
         req.headers.authorization;
      console.log("Raw token from request:", token); // <-- ADD THIS
      // If token is in Authorization header, remove "Bearer " part
      if (req.headers.authorization && typeof token === "string") {
         token = token.split(" ").pop().trim();
         console.log("VERIFY SECRET:", process.env.JWT_SECRET);
         console.log("Token after split:", token); // <-- ADD THIS
      }
      // If no token is found, block access
      if (!token) {
         return res
            .status(401)
            .json({ message: "You must be logged in to do that." });
      }
      try {
         // Verify the token and extract the payload
         const { data } = jwt.verify(token, secret, { maxAge: expiration }); // <-- Use 'data' here instead of 'payload'
         console.log("Token is valid:", data); // <-- Corrected log
         // Attach user data to the request object
         req.user = data;
      } catch (err) {
         // Token is invalid or expired
         console.log("Invalid token:", err.message); // <-- Log error message for debugging
         return res.status(401).json({ message: "Invalid token." });
      }
      // Allow request to continue to the next middleware/controller
      next();
   },
   // Function to create/sign a JWT when user logs in or registers
   signToken: function ({ username, email, _id }) {
      // Data to store inside the token
      const payload = { username, email, _id };
      // Sign and return the JWT
      return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
   },
};