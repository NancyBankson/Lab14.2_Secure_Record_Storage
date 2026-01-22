const express = require('express');
const app = express();
const connectDB = require("./db/connection");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
const routes = require('./routes');

connectDB();

app.use(express.json());
app.use(express.urlencoded());

app.use('/api/users', userRouter);
app.use('/api/notes', noteRouter);

 
// app.use(routes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// const express = require('express');
// const path = require('path');
// const db = require('./db/connection');
// const routes = require('./routes');
// require('dotenv').config();
// // const express = require('express');
// const app = express();
// // const connectDB = require("./db/connection");
// // require("dotenv").config();
// const PORT = process.env.PORT || 3001;
// // const userRouter = require("./routes/userRoutes");
// // const noteRouter = require("./routes/noteRoutes");
// // const routes = require('./routes');
 
// // const app = express();
// // const PORT = process.env.PORT || 3001;
 
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
 
// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }
 
// app.use(routes);
 
// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });