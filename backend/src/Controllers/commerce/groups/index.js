import Group from "../../../Models/product-management/groups/index.js";
import Validations from "../../../Validations/index.js";


export const CreateGroup = async (req,res) => {
    try {
     const value = Validations.validateGroup(req.body)
     const new_group = await Group.create({ name: value?.name,slug: value?.slug,icon: value?.icon,...value})
     res.status(200).json({ status: 'success', message: "New group created successfully",data: new_group})
    } catch (error) {
      res.status(500).json({ status: "failed", message: error?.message })  
    }
}

export const getAllGroups = async (req,res) => {
    try {
    const groups_list = await Group.find({ is_delete: false })  
    res.status(200).json({ status: 'success', message: "All groups retrived successfully",data: groups_list})  
    } catch (error) {
      res.status(500).json({ status: "failed", message: error?.message })  
    }
}

export const getGroupDetailsWithSlug = async (req,res) => {
    try {
     const { slug } = req.params
     const category_details = await Group.findOne({ slug: slug })
     res.status(200).json({ status: "success", message: "Group details retrived successfully",data: category_details})
    } catch (error) {
      res.status(500).json({ status: 'failed', message: error?.message })  
    }
}

export const UpdateGroupDetails = async (req,res) => {
    try {
     const value = Validations.validateGroup(req.body)
     const { id } = req.params
     const updated_group = await Group.findOneAndUpdate({ _id: id},{ name: value.name,slug:value.slug,icon:value.icon,...value},{ new: true } )
     res.status(200).json({ status: "success", data: "Group Updated successfully",data: updated_group})   
    } catch (error) {
      res.status(500).json({ status: 'failed', message: error?.message }) 
    }
}

export const deleteGroup = async (req,res) => {
    try {
    const { id } = req.params
    await Group.findOneAndUpdate({ id: id},{ is_delete: true})   
    res.status(200).json({ status: 'success', message: "group deleted successfully"})
    } catch (error) {
      res.status(500).json({ status: 'failed', message: error?.message })  
    }
}