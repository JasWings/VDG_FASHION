import mongoose from 'mongoose';
import { generateUUID } from '../../../utils/helpers.js';
import { Sequence } from '../../helpers/sequence.js';

const UserSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, 
  uuid: { type: String, unique: true }, 
  email: { type: String, unique: true, required: true,  match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"], },
  phone_number: {
    type: String,
    required: true,
    unique: true,
    validate: {
        validator: function(v) {
            return /\+?\d{1,3}[- ]?\d{3}[- ]?\d{3}[- ]?\d{4}/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
    }
  },
  first_name : { type: String, required: true },
  last_name : { type: String, required : true  },
  password: { type: String, required: true },
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  isActive: { type: Boolean, default: true }, 
  isDeleted: { type: Boolean, default: false },
  is_verified : { type: Boolean, default: false}, 
  is_super_user : { type: Boolean, default: false }
}, { timestamps: true });


UserSchema.pre('save', async function (next) {
   if(!this.uuid){
     try {
      const uuid = await generateUUID()
      const sequence = await Sequence.findByIdAndUpdate("user",{ $inc: { seq: 1}},{ new: true, upsert: true }) 
      this.id = sequence.seq
      this.uuid = uuid
      next() 
     } catch (error) {
       next(error) 
     }
   }else{
    next()
   }
});

export const User = mongoose.model('User', UserSchema);

const OtpSchema = new mongoose.Schema({
    email : { type: String , required : true},
    otp : {type : String , required :true},
    token : {type : String , required : true}, 
    validated: { type: Boolean, default: false },
    is_active : {type : Boolean ,default : true},
    is_delete : {type : Boolean , default : false},
    type : { type: String ,default : null},
    // createdAt:{type : Date,expires:360000,default:Date.now}
})

OtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 360000 });

export const Otps = mongoose.model("Otps",OtpSchema)

const TokenSchema = new mongoose.Schema({
    email:{type:String,required:true},
     token:{type:String,required:true},
     createdAt: { type: Date, expires: '1d', default: Date.now },
   
})

export const  Tokens = mongoose.model("Tokens",TokenSchema)


const RoleSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    uuid: { type: String, unique: true }, 
    identity: { type: String, required: true, unique: true },
    description: { type: String }, 
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  }, { timestamps: true });
  

  RoleSchema.pre('save', async function (next) {
    if(!this.id){
       try {
         const uuid = await generateUUID()
         const sequence = await Sequence.findByIdAndUpdate("Role",{ $inc: { seq: 1}},{ new: true, upsert: true})
         this.id = sequence.seq
         this.uuid = uuid
         next()
       } catch (error) {
         next(error)
       }
    }else{
        next()
    }
    next();
  });
  
  export const Role = mongoose.model('Role', RoleSchema);

  
  const FeatureSchema = new mongoose.Schema({
    id: { type: Number, unique: true }, 
    uuid: { type: String, unique: true },
    identity: { type: String, required: true, unique: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  }, { timestamps: true });
  
  
  FeatureSchema.pre('save', async function (next) {
    if(!this.id){
     const uuid = await generateUUID()
     const sequence = await Sequence.findByIdAndUpdate("Feature",{ $inc: { seq: 1}},{ new: true, upsert: true})
     this.uuid = uuid
     this.id = sequence.seq
     next()  
    }else{
        next()
    }
    next();
  });
  
  export const Feature = mongoose.model('Feature', FeatureSchema);

  const RolePermissionSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    uuid: { type: String, unique: true },
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true }, 
    featureId: { type: mongoose.Schema.Types.ObjectId, ref: 'Feature', required: true },
    permissions: { 
      type: [String],
      enum: ["retrieve", "create", "delete", "update"], 
      required: true 
    },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  }, { timestamps: true });
  
  
  RolePermissionSchema.pre('save', async function (next) {
    if(!this.id){
      try {
        const uuid = await generateUUID()
        const sequence = await Sequence.findByIdAndUpdate("PermissionTable",{ $inc: { seq: 1}},{ new: true, upsert: true})
        this.id = sequence.seq
        this.uuid = uuid
        next() 
      } catch (error) {
        next(error)
      }
    }else{
        next()
    }
    next();
  });
  
  export const RolePermission = mongoose.model('RolePermission', RolePermissionSchema);
  