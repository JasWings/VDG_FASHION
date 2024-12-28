import Tax from '../../Models/order-management/tax.js';

export const createTax = async (req, res) => {
  try {
    const tax = new Tax(req.body);
    await tax.save();
    res.status(201).json(tax);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTaxes = async (req, res) => {
  try {
    const taxes = await Tax.find({ is_deleted: false });
    res.status(200).json(taxes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTaxById = async (req, res) => {
  try {
    const tax = await Tax.findById(req.params.id);
    if (!tax) {
      return res.status(404).json({ message: 'Tax record not found' });
    }
    res.status(200).json(tax);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTax = async (req, res) => {
  try {
    const tax = await Tax.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tax) {
      return res.status(404).json({ message: 'Tax record not found' });
    }
    res.status(200).json(tax);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTax = async (req, res) => {
  try {
    const tax = await Tax.findOneAndUpdate({ _id : req.params.id},{ is_deleted: true })
    if (!tax) {
      return res.status(404).json({ message: 'Tax record not found' });
    }
    res.status(200).json({ message: 'Tax record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
