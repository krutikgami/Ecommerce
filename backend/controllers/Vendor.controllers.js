import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { async_handler } from "../utilities/AsyncHandler.js";
import { Vendor } from "../models/Vendor.models.js";
import { CART } from "../models/Addcart.model.js";

const VendorSignin = async_handler(async (req, res) => {
    const { username,email, password,role } = req.body;
    console.log("email is", email);

    if (!username && !email && !password && !role) {
        throw new ApiError(400, "Username or Email not found");
    }
    else if( role != "vendor"){
       throw new ApiError(400, "Only vendor can login");
    }

    const vendor = await Vendor.findOne({
        $or: [{ username }, { email }]
    });

    if (!vendor) {
        throw new ApiError(400, "User not Found");
    }
   
    // const ispasswordValid = await vendor.ispasswordCorrect(password);
    // if (!ispasswordValid) {
    //     throw new ApiError(400, "Password is not valid");
    // }

    // const vendors = await Vendor.create({ username, email, password,role });

    const loggedInUser = await Vendor.findById(vendor._id).select("-password");
    return res.status(200).json(
        new ApiResponse(200, "User LoggedIn successfully", { vendor: loggedInUser })
    );
}
)

const DeleteProduct = async_handler( async(req,res) =>{
    try {
        const { id } = req.params;
        const product = await CART.findById(id);
        if (!product) {
          return res.status(404).json(new ApiResponse(200,"No Delete product"));
        }else{
        await product.deleteOne();
        res.status(200).json( new ApiResponse(200, "Delete Product successfully"));
        }
      } catch (error) {
        res.status(500).json( new ApiResponse(200, "Something Went Wrong"));
      }
})

export {VendorSignin,DeleteProduct}