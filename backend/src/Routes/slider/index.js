// routes/sliderRoutes.js
import express from 'express';
import multer from 'multer';
import { createMultipleSliders, createSliders, getAllSliders } from '../../Controllers/slider/index.js';
import { fileUplaodController, MutiplefileUplaodController } from '../../Controllers/uploads/index.js';

const Sliderrouter = express.Router();


const upload = multer({ storage: multer.memoryStorage() });


Sliderrouter.post('/', createSliders);


Sliderrouter.post('/multiple-upload', createMultipleSliders);


Sliderrouter.get('/', getAllSliders);

export default Sliderrouter;
