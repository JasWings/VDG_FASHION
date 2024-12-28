const mongoose = require('mongoose');
import { generateUUID } from '../../utils/helpers.js';
import { Sequence } from '../helpers/sequence.js';

const wishlistSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
      sparse: true,
    },
    uuid: {
      type: String,
      unique: true,
      default: uuidv4,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

wishlistSchema.pre('save', async function (next) {
  if (!this.id) {
    const sequence = await Sequence.findOneAndUpdate(
        { _id: "WishlistIds" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      const uuid = await generateUUID();
      this.id = sequence.seq;
      this.uuid = uuid;
  }
  next();
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
