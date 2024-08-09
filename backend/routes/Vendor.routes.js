import { Router } from "express";
import { VendorSignin,DeleteProduct } from "../controllers/Vendor.controllers.js";

const router = Router();


router.route('/vendor-login').post(VendorSignin)
router.route('/delete-card/:id').delete(DeleteProduct)

export default router;