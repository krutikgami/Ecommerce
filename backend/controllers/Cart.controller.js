import { CART } from '../models/Addcart.model.js';
import { async_handler } from '../utilities/AsyncHandler.js';
import { ApiError } from '../utilities/ApiError.js';
import { ApiResponse } from '../utilities/ApiResponse.js';
// import {useSelector} from 'react-redux'

const AddCart = async_handler(async (req, res) => {

//  const {currentUser} = useSelector(state=>state.user)

  const { category,subcategory,title, price, quantity } = req.body;
  const sizes = req.body.sizes ? JSON.parse(req.body.sizes) : [];
  const imageurl = req.fileUrl; // Get URL from middleware
  const publicId = req.filePublicId; // Get public ID from middleware
  const username = req.body.username;

  // const username = currentUser.data.user.username;
 
  if (!category || !subcategory || !title || !price || !quantity || sizes.length === 0) {
    throw new ApiError(400, "All fields are required!!");
  } else if (!imageurl || !publicId) {
    throw new ApiError(400, "Images not uploaded!!");
  } else {
    const imageuploaded = await CART.create({
      username,
      category,
      subcategory,
      title,
      price,
      sizes,
      quantity,
      imageurl: {
        public_id: publicId,
        url: imageurl,
      },
      
    });

    res.status(200).json(new ApiResponse(200, "Product uploaded", imageuploaded));
  }
});

const fetchCartDetail = async_handler(async (req, res) => {
  const cartdetails = await CART.find(); 
  return res.status(200).json(new ApiResponse(200, "PDFs fetched successfully", cartdetails));
});


const getProductsByCategory = async_handler( async(req, res) => {
  try {
    const subcategory = req.params.name;
    
    const carts = await CART.find({ subcategory })
    console.log(carts);
    if (!carts) {
      return res.status(400).json(new ApiResponse(400, 'No products found for this category' ));
    }

    return res.status(200).json(new ApiResponse(200, 'products found' ,carts));
  } catch (error) {
    console.log(error);
  }
}
)


const searchProductController = async_handler(async (req, res) => {
  try {
    const  {keyword}  = req.params;
    
    const result = await CART.find({
      $or: [
        { category: { $regex: keyword, $options: 'i' } },
        { subcategory: { $regex: keyword, $options: 'i' } },
        { title: { $regex: keyword, $options: 'i' } }
      ]
    });

    if (result.length > 0) {
      return res.status(200).json(new ApiResponse(200, 'products found', result));
    } else {
      return res.status(400).json(new ApiResponse(400, 'No products found'));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiResponse(500, 'Internal Server Error'));
  }
});



export {AddCart,fetchCartDetail,getProductsByCategory,searchProductController};

