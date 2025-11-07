import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.model.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

const seedProducts = async () => {
  try {
    // Connect to database
    await connectDB();

    // Read mock products from JSON file
    const mockProductsPath = path.join(__dirname, "../../mockProducts.json");
    const mockProducts = JSON.parse(fs.readFileSync(mockProductsPath, "utf8"));

    // Clear existing products
    await Product.deleteMany({});
    console.log("🗑️  Cleared existing products");

    // Insert mock products
    const products = await Product.insertMany(mockProducts);
    console.log(`✅ Seeded ${products.length} products successfully`);

    // Close database connection
    await mongoose.connection.close();
    console.log("✅ Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedProducts();

