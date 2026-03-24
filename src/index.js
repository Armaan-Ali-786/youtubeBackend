// require('dotenv').config({path: './env'});
import dotenv from 'dotenv';
import connectDB from "./db/index.js";
import { app } from './app.js';

dotenv.config();

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log(`There is an error occur in listening server: ${error}`);
        })
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running on port: ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log("MONGO DB connection failed !!! ", err);
    })



/*
1.FIRST APPROACH - HANDLE DATABASE

import express from 'express';
const app = express();

( async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        app.on("error", (error) => {
            console.log('our application not able to talk to database');
            throw error;
        });

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port: ${process.env.PORT}`)
        })
    } catch (error) {
        console.error("ERROR: ", error);
        throw error;
    }
})()

*/