import mongoose from 'mongoose';
import { generateUUID } from '../../../utils/helpers.js';
import { Sequence } from '../../helpers/sequence.js';


const valueSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    attribute_id: {
      type: Number,
      required: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
    },
    meta: {
      type: String,
      trim: true,
      maxlength: 255,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);


const attributeSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    uuid: {
      type: String,
      unique: true,
    },
    identity: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    values: [valueSchema],
    meta: {
      type: String,
      trim: true,
      maxlength: 255,
      default: '',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

attributeSchema.pre("save", async function (next) {
  if (!this.id) {
    try {
      const uuid = await generateUUID();
      const sequence = await Sequence.findByIdAndUpdate(
        "Attributes",
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.id = sequence.seq;
      this.uuid = uuid;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const Attribute = mongoose.model('Attribute', attributeSchema);

export default Attribute;
