const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
// const bodyParser = require('body-parser');

const app = express();
app.use(cors())
// app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const postRouter = require('./routes/post');

dotenv.config();

const PORT = process.env.PORT || 5000;



app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'));

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => {
    console.log('Server started on port', PORT)
})