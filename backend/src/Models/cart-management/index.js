import mongoose from "mongoose";
import { Sequence } from "../helpers/sequence.js";
import { generateUUID } from "../../utils/helpers.js";

const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    id: { type: Number, unique: true },
    uuid: { type: String, unique: true },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    price_details: {
      total_actual_price: { type: Number, required: true, default: 0 },
      total_current_price: { type: Number, required: true, default: 0 },
      total_quantity: { type: Number, required: true, default: 0 },
    },
    items: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "products", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        sale_price : { type: Number, required: true }
      },
    ],
    is_active: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

CartSchema.pre("save", async function (next) {
  try {
    if (!this.id) {
      const sequence = await Sequence.findOneAndUpdate(
        { _id: "CartIds" },
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

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
