// routes/sliderRoutes.js
import express from 'express';
import multer from 'multer';
import { getSliderImages } from '../../Controllers/slider';
import { fileUplaodController, MutiplefileUplaodController } from '../../Controllers/uploads';

const router = express.Router();

// Multer setup for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Route to upload a single image
router.post('/upload', upload.single('image'), fileUplaodController);

// Route to upload multiple images
router.post('/multiple-upload', upload.array('images', 10), MutiplefileUplaodController);

// Route to get all slider images
router.get('/images', getSliderImages);

export default router;
