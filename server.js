import 'express-async-errors'
import express from "express";
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import JobRouter from './router/router.js'
import AuthRouter from './router/authRouter.js'
import UserRouter from './router/userRouter.js'
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authMiddleware } from './middleware/authMiddleware.js';

// public
import path, { dirname } from 'path'
import { fileURLToPath } from "url";
import { v2 as cloudinary } from 'cloudinary';


const app = express()
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, './public')))

app.use(express.json())
app.use(cookieParser())



app.use('/api/v1/jobs', authMiddleware, JobRouter)
app.use('/api/v1/users', authMiddleware, UserRouter)
app.use('/api/v1/auth', AuthRouter)
app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public', 'index.html'))
})

app.use('*', (req, res) => {
    res.status(404).json({ 
        message: 'Not Found'
    })
})
app.use(errorHandlerMiddleware)
const port = process.env.PORT || 5100
try {
    await mongoose.connect(process.env.MONGODB_URL)
    app.listen(port, () => {
        console.log(`running hard ${port}`)
    })
}
catch (err) {
    console.log(err)
    process.exit(1)
}