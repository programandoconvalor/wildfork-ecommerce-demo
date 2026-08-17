import {
  productsResponseSchema,
  productSchema,
  type ProductsResponse,
  type ProductResponse,
} from "../schemas/product.schema";

const PRODUCTS_API_URL = "https://dummyjson.com/products";

export async function getProducts(): Promise<ProductsResponse> {
  const response = await fetch(PRODUCTS_API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: unknown = await response.json();

  return productsResponseSchema.parse(data);
}

export async function getProduct(
  productId: number,
): Promise<ProductResponse> {
  const response = await fetch(`${PRODUCTS_API_URL}/${productId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const data: unknown = await response.json();

  return productSchema.parse(data);
}