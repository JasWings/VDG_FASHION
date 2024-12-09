import Settings from "../../Models/settings/index.js"


export const createSettingsController = async (req,res) => {
    try {
    const data = req.body
    const new_settings = await Settings.create(data)
    res.status(200).json({ status: "success", message: "settings created successfully",data: new_settings})
    } catch (error) {
       res.status(500).json({ status: "failed", message: error?.message }) 
    }
}

export const getSettingsController = async (req,res) => {
    try {
    const find_settings = await Settings.find()
    const settings_data = find_settings?.[0]
  res.status(200).json({id: 1, options: settings_data})
    } catch (error) {
      res.status(500).json({ status: "failed", message: error?.message })   
    }
}