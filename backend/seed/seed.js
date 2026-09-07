import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

dotenv.config();

const seedProducts = [
  {
    name: "Fresh Milk",
    category: "Dairy",
    price: 60,
    quantity: 100,
    description: "Pure farm-fresh milk.",
    image: "",
  },
  {
    name: "Paneer Blocks",
    category: "Dairy",
    price: 150,
    quantity: 60,
    description: "Homemade cottage cheese.",
    image: "",
  },
  {
    name: "Organic Carrots",
    category: "Vegetables",
    price: 40,
    quantity: 120,
    description: "Crunchy organic carrots.",
    image: "",
  },
  {
    name: "Green Spinach",
    category: "Vegetables",
    price: 35,
    quantity: 90,
    description: "Fresh leafy greens.",
    image: "",
  },
  {
    name: "Golden Rice",
    category: "Grains",
    price: 55,
    quantity: 200,
    description: "Premium quality rice.",
    image: "",
  },
  {
    name: "Wheat Flour",
    category: "Grains",
    price: 45,
    quantity: 180,
    description: "Freshly milled wheat flour.",
    image: "",
  },
  {
    name: "Sweet Mangoes",
    category: "Fruits",
    price: 120,
    quantity: 80,
    description: "Seasonal mangoes from local farms.",
    image: "",
  },
  {
    name: "Fresh Bananas",
    category: "Fruits",
    price: 50,
    quantity: 150,
    description: "Sweet ripe bananas.",
    image: "",
  },
];

const farmerProducts = [
  {
    name: "Fresh Tomatoes",
    category: "Vegetables",
    price: 35,
    quantity: 120,
    description: "Juicy farm-grown tomatoes.",
    image: "",
  },
  {
    name: "Green Cucumbers",
    category: "Vegetables",
    price: 30,
    quantity: 100,
    description: "Crisp and fresh cucumbers.",
    image: "",
  },
  {
    name: "Leafy Lettuce",
    category: "Vegetables",
    price: 25,
    quantity: 80,
    description: "Fresh green lettuce.",
    image: "",
  },
  {
    name: "Bell Peppers",
    category: "Vegetables",
    price: 45,
    quantity: 90,
    description: "Colorful sweet bell peppers.",
    image: "",
  },
];

const seed = async () => {
  try {
    await connectDB();

    const adminUser = await User.findOne({ email: "admin@test.local" });
    if (!adminUser) {
      await User.create({
        name: "Admin User",
        email: "admin@test.local",
        password: await bcrypt.hash("admin123", 10),
        role: "admin",
        phone: "7777777777",
        address: "Admin Office",
      });
    }

    let farmer = await User.findOne({ email: "farmer@gmail.com" });
    if (!farmer) {
      farmer = await User.create({
        name: "Farmer User",
        email: "farmer@gmail.com",
        password: await bcrypt.hash("FARMER@123", 10),
        role: "farmer",
        phone: "9999999999",
        address: "Farm Lane",
      });
    }

    const consumerUser = await User.findOne({ email: "user@gmail.com" });
    if (!consumerUser) {
      await User.create({
        name: "Consumer User",
        email: "user@gmail.com",
        password: await bcrypt.hash("USER@123", 10),
        role: "consumer",
        phone: "8888888888",
        address: "City Home",
      });
    }

    const allProducts = [...seedProducts, ...farmerProducts];
    for (const data of allProducts) {
      const existingProduct = await Product.findOne({ name: data.name, farmer: farmer._id });
      if (!existingProduct) {
        await Product.create({ ...data, farmer: farmer._id });
      }
    }

    console.log("Seed complete");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
