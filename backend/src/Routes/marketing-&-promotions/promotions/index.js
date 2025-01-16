import express from "express"
import { createSliders, getActiveSliders, getAllSliders, getSliderById, updateSlider, deleteSlider } from "../../../Controllers/slider/index.js"

const SliderRouter = express.Router()


SliderRouter.post("/",createSliders)
SliderRouter.get('/active', getActiveSliders);
SliderRouter.get('/', getAllSliders);
SliderRouter.get('/:id', getSliderById);
SliderRouter.put('/:id', updateSlider);
SliderRouter.delete('/:id', deleteSlider);


export default SliderRouter