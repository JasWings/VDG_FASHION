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
    const find_settings = await Settings.find().populate({ path: "shippingClass", model: "Shipping"})
    const settings_data = find_settings?.[0]
  res.status(200).json({id: 1, options: settings_data})
    } catch (error) {
      res.status(500).json({ status: "failed", message: error?.message })   
    }
}

export const updateSettingsController = async (req,res) => {
  try {
   const { _id } = req.body 
   const updated_settings = await Settings.findByIdAndUpdate(_id,req.body,{ new: true })
   res.status(200).json({ status:"success", message: "Settings retrived successfully",data: updated_settings})
  } catch (error) {
    res.status(500).json({ status: "failed", message: error?.message })
  }
}