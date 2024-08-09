import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const VendorSchema = new mongoose.Schema(
    {
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        // required: true
    }
},{timestamps:true})


VendorSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  
  VendorSchema.methods.ispasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
  };
  

export const Vendor = mongoose.model('Vendor', VendorSchema);