import mongoose from "mongoose";
import { Sequence } from "../../helpers/sequence.js";
import { generateUUID } from "../../../utils/helpers.js";

const Schema = mongoose.Schema;

const AddressSchema = new Schema(
  {
    id: { type: Number, unique: true },
    uuid: { type: String, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address_type: {
      type: String,
      enum: ["billing", "shipping"],
      required: true,
    },
    phone_number: { type: String, required: true },
    is_primary: { type: Boolean, default: false },
    address_line_1: { type: String, required: true },
    address_line_2: { type: String },
    address_line_3: { type: String },
    landmark: { type: String },
    remarks: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pin_code: { type: Number, required: true },
    is_active: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

AddressSchema.pre("save", async function (next) {
  try {
    if (!this.id) {
      const sequence = await Sequence.findOneAndUpdate(
        { _id: "AddressIds" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      const uuid = await generateUUID();
      this.id = sequence.seq;
      this.uuid = uuid;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Address = mongoose.model("Address", AddressSchema);

export default Address;
