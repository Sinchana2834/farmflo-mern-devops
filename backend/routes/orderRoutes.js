import express from "express";
import {
  createOrder,
  getConsumerOrders,
  getFarmerOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/consumer/:id", protect, getConsumerOrders);
router.get("/farmer/:id", protect, getFarmerOrders);
router.put("/:id/status", protect, updateOrderStatus);

export default router;