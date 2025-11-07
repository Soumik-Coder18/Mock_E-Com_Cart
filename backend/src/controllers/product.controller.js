import ProductService from "../services/product.service.js";
import apiResponse from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const productController = {
  getAllProducts: asyncHandler(async (req, res) => {
    const products = await ProductService.getAllProducts();
    res.status(200).json(new apiResponse(200, products, 'Products retrieved successfully'));
  }),

  getProductById: asyncHandler(async (req, res) => {
    const product = await ProductService.getProductById(req.params.id);
    if (!product) {
      throw new apiError(404, 'Product not found');
    }
    res.status(200).json(new apiResponse(200, product, 'Product retrieved successfully'));
  }),

  createProduct: asyncHandler(async (req, res) => {
    const product = await ProductService.createProduct(req.body);
    res.status(201).json(new apiResponse(201, product, 'Product created successfully'));
  }),

  updateProduct: asyncHandler(async (req, res) => {
    const product = await ProductService.updateProduct(req.params.id, req.body);
    if (!product) {
      throw new apiError(404, 'Product not found');
    }
    res.status(200).json(new apiResponse(200, product, 'Product updated successfully'));
  }),

  deleteProduct: asyncHandler(async (req, res) => {
    const product = await ProductService.deleteProduct(req.params.id);
    if (!product) {
      throw new apiError(404, 'Product not found');
    }
    res.status(200).json(new apiResponse(200, null, 'Product deleted successfully'));
  }),

  getProductsInStock: asyncHandler(async (req, res) => {
    const products = await ProductService.getProductsInStock();
    res.status(200).json(new apiResponse(200, products, 'In-stock products retrieved successfully'));
  })
};

export default productController;