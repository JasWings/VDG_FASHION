import s3Client from "../../Config/bucket.js"
import { PutObjectCommand } from "@aws-sdk/client-s3";
import * as Helpers from "../../utils/helpers.js";
import Upload from "../../Models/uploads/index.js";

export const fileUplaodController = async (req, res) => {
  try {
    const file = req.file;
    const uuid = await Helpers.generateUUID();
    const file_name = uuid + "." + file.originalname.split(".").slice(-1)[0];
    const params = {
      Bucket: process.env.bucket_name,
      Key: "staticfiles/lms/" + file_name,
      Body: file.buffer,
      ContentType: "Mimetype",
    };
    const data = await s3Client.send(new PutObjectCommand(params));
    const uuid1 = await Helpers.generateUUID();
    const save_file_name = new Upload({ file: data.Key, uuid: uuid1 });
    await save_file_name.save();
    res.status(200).json({ status: "success", message: "file upload successfully", data: save_file_name });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message, data: null });
  }
};

export const MutiplefileUplaodController = async (req, res) => {
  try {
    const files = req.files;
    const uploadedFiles = [];

    for (const file of files) {
      const uuid = await Helpers.generateUUID();
      const file_name = uuid + "." + file.originalname.split(".").slice(-1)[0];
      const params = {
        Bucket: process.env.bucket_name,
        Key: "staticfiles/lms/" + file_name,
        Body: file.buffer,
        ContentType: "Mimetype",
      };
      const data = await s3Client.send(new PutObjectCommand(params));
      const uuid1 = await Helpers.generateUUID();
      const save_file_name = new Upload({ file: data.Key, uuid: uuid1 });
      await save_file_name.save();
      uploadedFiles.push(save_file_name);
    }

    res.status(200).json({ status: "success", message: "Files uploaded successfully", data: uploadedFiles });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message, data: null });
  }
};
