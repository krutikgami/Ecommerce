import express from 'express';
import { upload, uploadFileToCloudinary } from '../utilities/cloudinary.js';
import { AddCart, fetchCartDetail } from '../controllers/Cart.controller.js';
import { getProductsByCategory } from '../controllers/Cart.controller.js';
import { searchProductController } from '../controllers/Cart.controller.js';

const router = express.Router();

router.route("/add-cart").post(upload, uploadFileToCloudinary, AddCart);
router.route("/fetch-card").post(fetchCartDetail);
router.route('/products/:name').post(getProductsByCategory);
router.route('/search/:keyword').post(searchProductController);

export default router;
