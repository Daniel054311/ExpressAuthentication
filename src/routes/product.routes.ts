import { Router } from "express";
import ProductControllers from "../controllers/product.controller";
import { UserRole } from "../dto/dto.userRoles";
import { checkUserRole } from "../middlewares/checkUser.middleware";
import { authenticate } from "../middlewares/authenticate.middleware";

const productRouter = Router();

productRouter.get("/products",authenticate, ProductControllers.getAllProducts);

productRouter.get("/products/:id",authenticate, ProductControllers.getProductById);

productRouter.post("/products",authenticate,checkUserRole([UserRole.ADMIN,UserRole.BUYER]), ProductControllers.createProduct);

productRouter.put("/products/:id",authenticate,checkUserRole([UserRole.ADMIN,UserRole.BUYER]), ProductControllers.updateProduct); 

productRouter.delete("/products/:id",authenticate,checkUserRole([UserRole.ADMIN,UserRole.BUYER]), ProductControllers.deleteProduct);

export default productRouter;