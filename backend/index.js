import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/Config/db.js"
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { razorpayWebhook } from "./src/Controllers/payment/index.js";

import router from "./src/Routes/main/index.js";


dotenv.config();

connectDB();

import s3 from "./src/Config/bucket.js";

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
  

const determineContentType = (filename) => {
  const extension = filename.split('.').pop().toLowerCase();
  switch (extension) {
      case 'pdf':
          return 'application/pdf';
      case 'jpg':
      case 'jpeg':
          return 'image/jpeg';
      case 'png':
          return 'image/png';
      default:
          return 'application/octet-stream'; 
  }
};

app.get("/staticfiles/commerce/:key", async (req, res) => {
  const { key } = req.params;
  const Key =  key;
 
  const params = {
    Bucket: process.env.bucket_name,
    Key:  "commerce/" + Key,
  };

  try {
    const command = new GetObjectCommand(params);
    const response = await s3.send(command);

    const contentType = determineContentType(key);
    res.set("Content-Type", contentType);

    response.Body.pipe(res);
  } catch (err) {
    console.error("Error fetching file from S3:", err);
    res.status(500).send("Error fetching file from S3");
  }
});

app.get("/staticfiles/admin-images/:key", async (req, res) => {
  const { key } = req.params;
  const Key =  key;
 
  const params = {
    Bucket: process.env.bucket_name,
    Key:  "admin-images/" + Key,
  };

  try {
    const command = new GetObjectCommand(params);
    const response = await s3.send(command);

    const contentType = determineContentType(key);
    res.set("Content-Type", contentType);

    response.Body.pipe(res);
  } catch (err) {
    console.error("Error fetching file from S3:", err);
    res.status(500).send("Error fetching file from S3");
  }
});

app.use('/api/v1/', router);

app.post("/api/payment/webhook", razorpayWebhook);

app.get('/', (req, res) => {
  res.send("<h1>Welcome to VDG Fashion</h1>");
});


const PORT = process.env.PORT || 8081;
const ADDRESS = process.env.environment === "ip" ? process.env.APP_URL : "localhost";




console.log(`Server running on http://localhost:${PORT}`);
app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});