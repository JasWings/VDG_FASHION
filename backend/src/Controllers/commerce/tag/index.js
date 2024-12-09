import Tag from '../../../Models/product-management/tags/index.js';
import Validations from "../../../Validations/index.js"

const createTag = async (req, res) => {
  try {
    const tagData = req.body;
    
    const validatedTag = Validations.validateTag(tagData);

    const tag = new Tag(validatedTag);
    await tag.save();

    res.status(201).json({ status: "success", message: 'Tag created successfully', data: tag });
  } catch (error) {
    res.status(500).json({ status: "failed", message : error.message });
  }
};


const getTagByUuid = async (req, res) => {
  try {
    const { uuid } = req.params;
    const tag = await Tag.findOne({ uuid });

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.status(200).json({ status: "success", message: "Tag retrived successfully",data: tag});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTag = async (req, res) => {
  try {
    const { uuid } = req.params;
    const tagData = req.body;

    const validatedTag = Validations.validateTag(tagData);

    const tag = await Tag.findOneAndUpdate({ uuid }, validatedTag, { new: true });

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.status(200).json({ status: 'success', message: 'Tag updated successfully', data: tag });
  } catch (error) {
    res.status(400).json({ status: "success", message: error.message });
  }
};


const deleteTag = async (req, res) => {
  try {
    const { uuid } = req.params;
    const tag = await Tag.findOneAndDelete({ uuid });

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.status(200).json({ status: 'success', message: 'Tag deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

export { createTag, getTagByUuid, updateTag, deleteTag };
