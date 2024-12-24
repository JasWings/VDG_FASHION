import Attribute from '../../../Models/product-management/attributes/index.js';
import Validations from '../../../Validations/index.js';
import { generateUUID } from '../../../utils/helpers.js';
import { Sequence } from '../../../Models/helpers/sequence.js';


const createAttribute = async (req, res) => {
  try {
    const attributeData = req.body;

    const validatedAttribute = Validations.validateAttribute(attributeData);

    const sequence = await Sequence.findByIdAndUpdate(
      "Attributes",
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    const attributeId = sequence.seq;
    const uuid = await generateUUID()

    const updatedValues = await Promise.all(
      validatedAttribute.values.map(async (value, index) => {
        const valueId = index + 1
        const valueUUID = await generateUUID();
        return {
          ...value,
          id: valueId,
          attribute_id: attributeId,
          uuid: valueUUID,
        };
      })
    );

    
    const attribute = new Attribute({
      ...validatedAttribute,
      id: attributeId,
      values: updatedValues,
      uuid : uuid
    });

    await attribute.save();

    res.status(201).json({
      status: "success",
      message: "Attribute created successfully",
      data: attribute,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};




const getAllAttributes = async (req, res) => {
  try {
    const attributes = await Attribute.find({ is_deleted: false });

    // if (attributes.length === 0) {
    //   return res.status(404).json({ message: 'No attributes found' });
    // }

    res.status(200).json({ status: "success", message: "Attributes retrived successfully",data: attributes});
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
    const attribute = await Attribute.findOneAndUpdate({ _id: id},{ is_deleted: true})

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
