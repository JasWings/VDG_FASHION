// routes/sliderRoutes.js
import express from 'express';
import multer from 'multer';
import { createMultipleSliders, createSliders, deleteSlider, getActiveSliders, getAllSliders, getSliderById, updateSlider } from '../../Controllers/slider/index.js';
import { fileUplaodController, MutiplefileUplaodController } from '../../Controllers/uploads/index.js';

const Sliderrouter = express.Router();


const upload = multer({ storage: multer.memoryStorage() });


Sliderrouter.post('/', createSliders);



Sliderrouter.post('/multiple', createMultipleSliders);


Sliderrouter.get('/active', getActiveSliders);


Sliderrouter.get('/:id', getSliderById);


Sliderrouter.put('/:id', updateSlider);

Sliderrouter.delete('/:_id', deleteSlider);

Sliderrouter.get('/', getAllSliders);


export default Sliderrouter;
