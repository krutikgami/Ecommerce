import mongoose from 'mongoose'

const CartSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
    category:{
    type:String,
    required:true,
    },
    subcategory:{
      type:String,
      required:true,
      },
    title: {
        type: String,
        required: true,
      },
      sizes:{
        type:Array,
        default:[]
    },
     price:{
      type: Number,
      required:true
      },
      quantity:{
        type:Number,
        required:true,
      },
      imageurl: {
        public_id: {
          type: String,
          required: true, 
        },
        url: {
          type: String,
          required: true,
        },
      },
          
    }, { timestamps: true }
);
   
export const CART = mongoose.model('CART', CartSchema);
