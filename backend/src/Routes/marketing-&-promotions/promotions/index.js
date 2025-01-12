import express from "express"
import { createSliders } from "../../../Controllers/slider/index.js"

const SliderRouter = express.Router()


SliderRouter.post("/",createSliders)


export default SliderRouter