// routes/sliderRoutes.js
import express from 'express';
import multer from 'multer';
import { getSliderImages } from '../../Controllers/slider';
import { fileUplaodController, MutiplefileUplaodController } from '../../Controllers/uploads';

const router = express.Router();


const upload = multer({ storage: multer.memoryStorage() });


router.post('/upload', upload.single('image'), fileUplaodController);


router.post('/multiple-upload', upload.array('images', 10), MutiplefileUplaodController);


router.get('/images', getSliderImages);

export default router;
