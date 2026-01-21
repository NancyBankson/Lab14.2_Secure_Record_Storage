const express = require('express');
const app = express();
const connectDB = require("./db/connection");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const userRouter = require("./routes/userRoutes");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', userRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});