import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  try {
    const { productId, quantity, address, paymentMethod } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({ success: false, message: "Insufficient stock" });
    }

    const totalPrice = product.price * quantity;

    const order = await Order.create({
      consumer: req.user._id,
      farmer: product.farmer,
      product: product._id,
      quantity,
      totalPrice,
      address,
      paymentMethod,
      status: "Pending",
    });

    product.quantity -= quantity;
    await product.save();

    const populatedOrder = await Order.findById(order._id)
      .populate("consumer", "name email phone")
      .populate("farmer", "name email phone")
      .populate("product", "name price");

    res.status(201).json({ success: true, message: "Order created successfully", order: populatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getConsumerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ consumer: req.params.id })
      .populate("consumer", "name email phone")
      .populate("farmer", "name email phone")
      .populate("product", "name price")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFarmerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ farmer: req.params.id })
      .populate("consumer", "name email phone")
      .populate("farmer", "name email phone")
      .populate("product", "name price")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (req.user.role !== "farmer" && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Only farmers or admins can update order status" });
    }

    if (req.user.role === "farmer" && order.farmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "You can only update your own orders" });
    }

    order.status = req.body.status;
    await order.save();
    const populatedOrder = await Order.findById(order._id)
      .populate("consumer", "name email phone")
      .populate("farmer", "name email phone")
      .populate("product", "name price");

    res.json({ success: true, message: "Order status updated", order: populatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};