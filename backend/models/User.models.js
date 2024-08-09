import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
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
    confirmpassword: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        required: true,
    },

},
 {
    timestamps: true
});

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
     if(!this.isModified("confirmpassword")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmpassword = await bcrypt.hash(this.confirmpassword, 10);
    next();
  });
  
  userSchema.methods.ispasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
  };
  
  userSchema.methods.isConfirmPasswordCorrect = async function(confirmPassword) {
    return await bcrypt.compare(confirmPassword, this.confirmpassword);
  };

export const User = mongoose.model('User', userSchema);
