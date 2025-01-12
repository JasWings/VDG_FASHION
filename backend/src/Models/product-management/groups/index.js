import mongoose from "mongoose";
import { generateUUID } from "../../../utils/helpers.js";
import { Sequence } from "../../helpers/sequence.js";

const BannerSchema = new mongoose.Schema({
  type_id: { type: Number },
  title: { type: String },
  description: { type: String },
  image: {
    id: { type: Number },
    original: { type: String  },
    thumbnail: { type: String },
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const PromotionalSliderSchema = new mongoose.Schema({
  id: { type: Number },
  file: { type: String  },
});

const SettingsSchema = new mongoose.Schema({
  isHome: { type: Boolean },
  layoutType: { type: String },
  productCard: { type: String },
});

const GroupSchema = new mongoose.Schema({
  id : { type: Number, unique: true},
  uuid : { type: String, unique: true },
  name: { type: String, required: true },
  settings: { type: SettingsSchema },
  slug: { type: String, required: true },
  language: { type: String },
  icon: { type: String, required: true },
  promotional_sliders: [PromotionalSliderSchema],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  translated_languages: [{ type: String }],
  banners: [BannerSchema],
  is_delete: { type: Boolean, default: false},
  is_active: { type: Boolean, default: true }
},{ timestamps: true });


GroupSchema.pre("save",async function(next){
   if(!this.id){
      try {
        const uuid = await generateUUID()
        const sequence = await Sequence.findByIdAndUpdate("CategoryGroupId",{ $inc: { seq: 1} },{ new: true, upsert: true })
        this.uuid = uuid
        this.id = sequence.seq
        next()
      } catch (error) {
        next(error)
      }
   }else{
     next()
   } 
})

const Group = mongoose.model("Group", GroupSchema);

export default Group;
