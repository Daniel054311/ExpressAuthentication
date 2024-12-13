import { Request, Response } from "express";
import connectDB from "../data-source";
import { Product } from "../entities/product";
import { User } from "../entities/users";
import {
  deleteProductById,
  findProductById,
  getAllProductsWithOwners,
  saveProduct,
  updateProductDetails,
} from "../repository/product.repository";
import { AuthenticatedRequest } from "../dto/types";
import { findUserById } from "../repository/user.repository";

class ProductControllers {
  static async createProduct(req: Request, res: Response): Promise<void> {
    try {
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
        console.log(req)
      const userId = (req as AuthenticatedRequest).user?.id;

      if (!userId) {
        res
          .status(401)
          .json({ message: "Unauthorized: You are not logged in" });
        return;
      }
    
      await findUserById(userId);
     

      const updatedProduct = await updateProductDetails(id, req.body);
      if (!id) {
        res.status(404).json({ error: "Product not found" });
        return;
      }

      res.status(201).json({ message: "Product updated successfully"});
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
