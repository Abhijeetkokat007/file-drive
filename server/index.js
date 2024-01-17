import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import schemaPdf from "./models/schemaPdf.js"
import path from "path";    

dotenv.config();
const __dirname = path.resolve();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/files", express.static("files"));

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGOODB_URI
    
            , {
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



// multer ------------------------------------------------------------
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./api/files");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});

// const PdfSchema = mongoose.model("PdfDetails");
const upload = multer({ storage: storage });

// api -------------------------->
app.post("/upload-files", upload.single("file"), async (req, res) => {
    console.log(req.file);
    const title = req.body.title;
    const fileName = req.file.filename;
    try {
        await schemaPdf.create({ title: title, pdf: fileName });
        res.send({ status: "ok" });
    } catch (error) {
        res.json({ status: error });
    }
});

app.get("/get-files", async (req, res) => {
    try {
        schemaPdf.find({}).then((data) => {
            res.send({ status: "ok", data: data });
        });
    } catch (error) {
     
        console.error(error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
});


app.get("/api", async (req, res) => {
    res.send("Success!!!");
});

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, '..', 'client', 'build'))); 
   
    app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
    });
   }

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

connectDB();
