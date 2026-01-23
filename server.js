const express = require('express');
const app = express();
const connectDB = require("./db/connection");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
// const routes = require('./routes');

connectDB();

app.use(express.json());
app.use(express.urlencoded());

app.use('/api/users', userRouter);
app.use('/api/notes', noteRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});