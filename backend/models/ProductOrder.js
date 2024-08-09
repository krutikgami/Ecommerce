import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  Vendorusername: {
    type: String,
    required: true,
   
  },
  userEmail: {
    type: String,
    required: true
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'CART'
      },
      category: {
        type: String,
        required: true
      },
      subcategory: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      chosenSize: {
        type: String,
      },
      quantity: {
        type: Number,
        required: true
      },
      totalAmount: {
        type: Number,
        required: true
      },
      imageurl: {
          type: String,
          required: true,
        },
      
    }
  ],
},{timestamps:true});

export const Order = mongoose.model('Order', orderSchema);


