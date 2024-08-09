import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { async_handler } from "../utilities/AsyncHandler.js";
import { User } from "../models/User.models.js";
import {Order} from '../models/ProductOrder.js'
import { CART } from "../models/Addcart.model.js";
import jwt from 'jsonwebtoken'



const UserSignup = async_handler(async (req, res) => {
  
    const { username, email, password, confirmpassword , role } = req.body;

    console.log("email is", email);

    if ([username, email, password, confirmpassword , role].some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }else if(password != confirmpassword){
        throw new ApiError(400, "Passwords do not match");
    }

    const existUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existUser) {
        throw new ApiError(400, "User already exists");
    }


    const user = await User.create({ username, email, password,confirmpassword,role });

    const createdUser = await User.findById(user._id).select("-password");
    if (!createdUser) {
        throw new ApiError(400, "User not created");
    }


    res.status(200).json(new ApiResponse(200, "User created successfully",   createdUser ));
});




const UserLogin = async_handler(async (req, res) => {
    const { username, email, password} = req.body;
    console.log("email", email);

    if (!username && !email) {
        throw new ApiError(400, "Username or Email not found");
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (!user) {
        throw new ApiError(400, "User not Found");
    }

    const ispasswordValid = await user.ispasswordCorrect(password);
    if (!ispasswordValid) {
        throw new ApiError(400, "Password is not valid");
    }

    const loggedInUser = await User.findById(user._id).select("-password");

    const token = jwt.sign({email:user.email},process.env.JWT_SECRET_KEY,{
        expiresIn:10,
    })
        
    return res.status(200).json(new ApiResponse(200, "User LoggedIn successfully", { user: loggedInUser,token}));
});

const userFetchData = async_handler(async (req, res) => {
   
    const user = await User.find(); 

  return res.status(200).json(new ApiResponse(200, "User fetched successfully", user));
});





const OrderProduct = async_handler(async (req, res) => {
    try {
      const { userEmail, items,Vendorusername } = req.body;
  
      const orderItems = items.map(item => ({
        productId: item.productId,
        category: item.category,
        subcategory: item.subcategory,
        title: item.title,
        quantity: item.quantity,
        totalAmount: item.totalAmount,
        imageurl:item.imageurl
      }));
  
      const order = await Order.create({
        Vendorusername:Vendorusername,
        userEmail: userEmail,
        items: orderItems,
      });
  
      for (const item of items) {
        const cartItem = await CART.findById(item.productId);
        if (!cartItem) {
          return res.status(404).json(new ApiResponse(401, `Product with ID ${item.productId} not found`));
        }
  
        if (cartItem.quantity < item.quantity) {
          return res.status(400).json(new ApiResponse(401, `Product ${cartItem.title} is out of stock`));
        }
  
        cartItem.quantity -= item.quantity;
  
        await cartItem.save();
      }
  
      return res.status(201).json(new ApiResponse(201, 'Order created successfully', order));
    } catch (error) {
      console.error(error);
      return res.status(500).json(new ApiResponse(500, 'Internal Server Error'));
    }
  });



  const fetchOrderProduct = async_handler(async(req,res)=>{
   
      const product = await Order.find()

      if(product){
       return res.status(201).json(new ApiResponse(200,"Succesfully Fetch User Product",product))
      }
      return res.status(401).json(new ApiResponse(400,"Product Not found"))
  })

  
  export { UserLogin, UserSignup, userFetchData, OrderProduct,fetchOrderProduct };
  