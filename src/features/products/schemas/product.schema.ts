import { z } from "zod";

/**
 * Product review returned by DummyJSON.
 */
export const productReviewSchema = z.object({
  rating: z.number(),
  comment: z.string(),
  date: z.string(),
  reviewerName: z.string(),
  reviewerEmail: z.string(),
});

/**
 * Product schema.
 *
 * This schema validates only the fields required by
 * the application domain.
 *
 * DummyJSON returns additional fields such as:
 * brand, sku, weight, dimensions, warrantyInformation,
 * shippingInformation, etc.
 *
 * Those fields are intentionally not part of our Product
 * domain model because the current application does not
 * require them.
 */
export const productSchema = z.object({
  id: z.number(),

  title: z.string(),

  description: z.string(),

  category: z.string(),

  price: z.number(),

  discountPercentage: z.number(),

  rating: z.number(),

  stock: z.number(),

  thumbnail: z.string(),

  images: z.array(z.string()),

  reviews: z.array(productReviewSchema),
});

/**
 * Products collection response.
 */
export const productsResponseSchema = z.object({
  products: z.array(productSchema),

  total: z.number(),

  skip: z.number(),

  limit: z.number(),
});

export type ProductResponse = z.infer<
  typeof productSchema
>;

export type ProductsResponse = z.infer<
  typeof productsResponseSchema
>;