import Product from "../models/product.model.js";

class ProductService {
  async getAllProducts() {
    return await Product.find({});
  }

  async getProductById(id) {
    return await Product.findById(id);
  }

  async createProduct(productData) {
    const product = new Product(productData);
    return await product.save();
  }

  async updateProduct(id, updateData) {
    return await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }

  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }

  async getProductsInStock() {
    return await Product.find({ inStock: true });
  }
}

export default new ProductService();