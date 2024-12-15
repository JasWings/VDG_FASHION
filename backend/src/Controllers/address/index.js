import Address from "../../Models/user-management/administration/address.js";
import Validations from "../../Validations/index.js";


export const createAddress = async (req, res) => {
  try {
    const  value = Validations.ValidateCustomerAddress(req.body);

    const { user } = req.body;

    const address = new Address({
      ...value,
      user: user || req.user?._id,
    });

    await address.save();

    res.status(201).json({ status: "success", message: "Address added successfully", data : address });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};


export const getAddresses = async (req, res) => {
  try {
    const user = req.user;
    const addresses = await Address.find({ user: user?._id, is_deleted: false });

    res.status(200).json({ status: "success", message: "All customer address retrived successfully", data: addresses });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};


export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const value = Validations.ValidateCustomerAddress(req.body)

    if (error) {
      return res.status(400).json({ status: "failed", message: error.message });
    }

    const updatedAddress = await Address.findOneAndUpdate(
      { id, user: req.user?._id, is_deleted: false },
      value,
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ status: "failed", message: "Address not found" });
    }

    res.status(200).json({ status: "success", address: updatedAddress });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};


export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAddress = await Address.findOneAndUpdate(
      { id, user: req.user?._id, is_deleted: false },
      { is_deleted: true },
      { new: true }
    );

    if (!deletedAddress) {
      return res.status(404).json({ status: "failed", message: "Address not found" });
    }

    res.status(200).json({ status: "success", message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};
