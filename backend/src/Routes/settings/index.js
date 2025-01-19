import express from "express"
import { createSettingsController, getSettingsController, updateSettingsController } from "../../Controllers/settings/index.js"

const SettingsRouter = express.Router()

SettingsRouter.post("/",updateSettingsController)
SettingsRouter.get("/",getSettingsController)

export default SettingsRouter