import productRepository from "../repositories/products";
import { ProductFromDB } from "../types/index";
import { makeError } from "../middlewares/errorHandler";

const getAllProducts = async () => {
  const products = await productRepository.selectAllProducts();
  const formatedProducts = products.map((product) => ({
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.image,
    rating: {
      rate: product.rate,
      count: product.count,
    },
  }));
  return formatedProducts;
};

const getProductById = async (id: number) => {
  const product = await productRepository.selectProductById(id);
  const formatedProducts = product.map((product) => ({
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.image,
    rating: {
      rate: product.rate,
      count: product.count,
    },
  }));
  if (!product.length) throw new Error("Product not found");
  return formatedProducts[0];
};

const postProduct = async (product: ProductFromDB) => {
  const { category, rating, ...data } = product;

  const categoryId = await productRepository.selectProductCategoryId(category);
  if (!categoryId[0].id)
    throw makeError({ message: "Category does not exist", status: 400 });
  const productId = await productRepository.insertProduct({
    category_id: categoryId[0].id,
    ...rating,
    ...data,
  });

  return {
    id: productId[0],
    category,
    ...data,
    rating,
  };
};

const updateProduct = async (product: any) => {
  const { category, rating = {}, id, ...data } = product;

  const productToUpdate = {
    id,
    ...data,
    ...rating,
  };

  if (category) {
    const selectedCategory = await productRepository.selectProductCategoryId(
      category
    );
    const categoryId: number | undefined = selectedCategory[0].id;

    if (!categoryId) {
      throw new Error("Category not found");
    }

    productToUpdate.category_id = categoryId;
  }

  const updatedProduct = await productRepository.updateProduct(productToUpdate);

  if (!updatedProduct) throw new Error("Product not found");
  return product;
};

const deleteProduct = async (id: number) => {
  const product = await productRepository.deleteProductFromDB(id);
  if (!product) throw new Error("Product not found");
};

export default {
  getAllProducts,
  getProductById,
  postProduct,
  updateProduct,
  deleteProduct,
};
