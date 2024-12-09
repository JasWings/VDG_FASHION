import Attribute from '../../../Models/product-management/attributes/index.js';
import Validations from '../../../Validations/index.js';


const createAttribute = async (req, res) => {
  try {
    const attributeData = req.body;
    
    const validatedAttribute = Validations.validateAttribute(attributeData);

    const attribute = new Attribute(validatedAttribute);

    await attribute.save();

    res.status(201).json({ status: "success", message: 'Attribute created successfully', data: attribute });
  } catch (error) {
    res.status(400).json({ status: "failed",  message : error.message });
  }
};


const getAllAttributes = async (req, res) => {
  try {
    const attributes = await Attribute.find();

    if (attributes.length === 0) {
      return res.status(404).json({ message: 'No attributes found' });
    }

    res.status(200).json(attributes);
  } catch (error) {
    console.error('Error fetching attributes:', error);
    res.status(500).json({ error: error.message });
  }
};


const getAttributeById = async (req, res) => {
  try {
    const { id } = req.params;
    const attribute = await Attribute.findById(id);

    if (!attribute) {
      return res.status(404).json({ message: 'Attribute not found' });
    }

    res.status(200).json(attribute);
  } catch (error) {
    console.error('Error fetching attribute:', error);
    res.status(500).json({ error: error.message });
  }
};


const updateAttribute = async (req, res) => {
  try {
    const { id } = req.params;
    const attributeData = req.body;


    const validatedAttribute = Validations.validateAttribute(attributeData);

    
    const attribute = await Attribute.findByIdAndUpdate(id, validatedAttribute, { new: true });

    if (!attribute) {
      return res.status(404).json({ message: 'Attribute not found' });
    }

    res.status(200).json({ message: 'Attribute updated successfully', attribute });
  } catch (error) {
    console.error('Error updating attribute:', error);
    res.status(400).json({ error: error.message });
  }
};


const deleteAttribute = async (req, res) => {
  try {
    const { id } = req.params;
    const attribute = await Attribute.findByIdAndDelete(id);

    if (!attribute) {
      return res.status(404).json({ message: 'Attribute not found' });
    }

    res.status(200).json({ message: 'Attribute deleted successfully' });
  } catch (error) {
    console.error('Error deleting attribute:', error);
    res.status(500).json({ error: error.message });
  }
};

export { createAttribute, getAllAttributes, getAttributeById, updateAttribute, deleteAttribute };
