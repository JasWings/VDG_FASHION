import express from "express"
import { createSettingsController, getSettingsController } from "../../Controllers/settings/index.js"

const SettingsRouter = express.Router()

SettingsRouter.post("/",createSettingsController)
SettingsRouter.get("/",getSettingsController)

export default SettingsRouter