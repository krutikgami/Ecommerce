import { Router } from "express";
const router = Router();
import { UserSignup, UserLogin, OrderProduct,fetchOrderProduct } from "../controllers/User.controllers.js";


router.route('/register').post(UserSignup);
router.route('/login').post(UserLogin);
router.route('/order').post(OrderProduct);
router.route('/fetchOrder').post(fetchOrderProduct);

export default router;
