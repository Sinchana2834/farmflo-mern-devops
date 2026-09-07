import express from "express";
import { getAllUsers, getAllProducts, getAllOrders } from "../controllers/adminController.js";
import { protect, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.use(protect, authorizeRoles("admin"));
router.get("/users", getAllUsers);
router.get("/products", getAllProducts);
router.get("/orders", getAllOrders);

export default router;
