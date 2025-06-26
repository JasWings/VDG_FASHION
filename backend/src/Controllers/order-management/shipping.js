import Shipping from "../../Models/order-management/shpping.js";
import Validations from "../../Validations/index.js";

export const createShipping = async (req, res) => {
  try {
    const value = Validations.validateShipping(req.body)
    const shipping = new Shipping(value);
    await shipping.save();
    res.status(201).json(shipping);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllShippings = async (req, res) => {
  try {
    const shippings = await Shipping.find({ is_deleted: false});
    res.status(200).json(shippings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getShippingById = async (req, res) => {
  try {
    const shipping = await Shipping.findOne({ id: req.params.id});
    if (!shipping) {
      return res.status(404).json({ message: 'Shipping record not found' });
    }
    res.status(200).json(shipping);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateShipping = async (req, res) => {
  try {
    const shipping = await Shipping.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!shipping) {
      return res.status(404).json({ message: 'Shipping record not found' });
    }
    res.status(200).json(shipping);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteShipping = async (req, res) => {
  try {
    const shipping = await Shipping.findOneAndUpdate({ _id: req.params.id},{ is_deleted:true})
    if (!shipping) {
      return res.status(404).json({ message: 'Shipping record not found' });
    }
    res.status(200).json({ message: 'Shipping record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
