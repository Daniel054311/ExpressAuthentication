import { Router } from "express";
import ProductControllers from "../controllers/product.controller";
import { UserRole } from "../dto/dto.userRoles";
import { authenticate } from "../middlewares/authenticate.middleware";
import { checkUserRole } from "../middlewares/checkUser.middleware";

const productRouter = Router();

productRouter.get("/products", authenticate, ProductControllers.getAllProducts);

productRouter.get("/products/user-products",authenticate, ProductControllers.getAUserProducts);

productRouter.get("/products/:id",authenticate, ProductControllers.getProductById);

productRouter.post("/products",authenticate,checkUserRole([UserRole.ADMIN,UserRole.SELLER]), ProductControllers.createProduct);

productRouter.put("/products/:id",authenticate,checkUserRole([UserRole.ADMIN,UserRole.SELLER]), ProductControllers.updateProduct); 

productRouter.delete("/products/:id",authenticate,checkUserRole([UserRole.ADMIN,UserRole.SELLER]), ProductControllers.deleteProduct);

export default productRouter;