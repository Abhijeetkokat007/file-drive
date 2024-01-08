import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

const app = express();
app.use(express.json());

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGOODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        if (conn) {
            console.log("Connected to MongoDB 😊");
        }
    } catch (err) {
        console.log(err.message);
    }
};



const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

connectDB();
