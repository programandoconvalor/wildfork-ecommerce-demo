/**
 * =========================================================
 * PRODUCT TYPES
 * =========================================================
 *
 * Canonical product model used across the application.
 *
 * This model represents the product structure returned by
 * the products API and consumed by:
 *
 * - Product Listing
 * - Product Detail
 * - Quick View
 * - Best Sellers
 * - Cart
 * - Checkout
 * - Product Cards
 */

/**
 * Customer review associated with a product.
 */
export type ProductReview = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

/**
 * Canonical product model.
 */
export type Product = {
  id: number;

  title: string;

  description: string;

  category: string;

  price: number;

  discountPercentage: number;

  rating: number;

  stock: number;

  thumbnail: string;

  images: string[];

  reviews: ProductReview[];

  /**
   * Calculated price used by the cart.
   *
   * This value is optional because the API product itself
   * does not necessarily provide a discounted price.
   */
  discountedPrice?: number;

  /**
   * Legacy image structure kept temporarily for components
   * that still consume thumbnails/previews.
   *
   * This should be removed once all legacy components are
   * migrated to `thumbnail` and `images`.
   */
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};