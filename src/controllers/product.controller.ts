import { Request, Response } from "express";
import connectDB from "../data-source";
import { AuthenticatedRequest } from "../dto/types";
import { Product } from "../entities/product";
import {
  deleteProductById,
  getAllProductsWithOwners,
  saveProduct,
  updateProductDetails,
} from "../repository/product.repository";
import { findUserById } from "../repository/user.repository";
import { productSchema } from "../utils/validation.util";

class ProductControllers {
  static async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const { error } = productSchema.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }

      const { description, price, imageUrl, name } = req.body;
      const userId = (req as AuthenticatedRequest).user?.id;

      await saveProduct(
        { description, price, imageUrl, name },
        userId as string
      );
      res.status(201).json({ message: "Product created successfully" });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await getAllProductsWithOwners();
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const productRepository = connectDB.getRepository(Product);
      const product = await productRepository.findOneBy({ id: id });
      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      console.log(req);
      const userId = (req as AuthenticatedRequest).user?.id;

      if (!userId) {
        res
          .status(401)
          .json({ message: "Unauthorized: You are not logged in" });
        return;
      }

      await findUserById(userId);

      await updateProductDetails(id, req.body);
      if (!id) {
        res.status(404).json({ error: "Product not found" });
        return;
      }

      res.status(201).json({ message: "Product updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req as AuthenticatedRequest).user?.id;

      if (!userId) {
        res
          .status(401)
          .json({ message: "Unauthorized: You are not logged in" });
        return;
      }

      await findUserById(userId);

      const isDeleted = await deleteProductById(id);
      if (!isDeleted) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
      res.status(200).json({ message: "Product deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default ProductControllers;
