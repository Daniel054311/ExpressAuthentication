import connectDB from "../data-source";
import { Product } from "../entities/product";
import { findUserWithRoles } from "./user.repository";

const productRepository = connectDB.getRepository(Product);

export const saveProduct = async (
  productData: Partial<Product>,
  userId: string
) => {
  if (!userId) {
    throw new Error("Invalid user");
  }
  const user = await findUserWithRoles(userId);
  if (!user) {
    throw new Error("Invalid user");
  }
  return await productRepository.save({ ...productData, user });
};

export const getAllProductsWithoutOwners = async (): Promise<Product[]> => {
  return await productRepository.find();
};

export const findProductById = async (id: string): Promise<Product | null> => {
  return await productRepository.findOneBy({
    id: id,
  });
};

export const updateProductDetails = async (
  id: string,
  updatedFields: Partial<Product>
): Promise<Product | null> => {
  const product = await findProductById(id);
  if (!product) {
    return null;
  }
  productRepository.merge(product, updatedFields);
  return await productRepository.save(product);
};

export const deleteProductById = async (id: string): Promise<boolean> => {
  const product = await findProductById(id);
  if (!product) {
    return false;
  }
  await productRepository.remove(product);
  return true;
};

export const getProductsByUserId = async (
  userId: string
): Promise<Product[]> => {
  await findUserWithRoles(userId);
  return await productRepository.find({
    where: { user: { id: userId } },
  });
};
