import { ProductListing } from "@/features/products/components/ProductListing";

/**
 * ProductsPage
 *
 * Entry point for the /products route.
 *
 * The page itself contains no product data.
 * ProductListing is responsible for retrieving and rendering
 * the catalog through the products API.
 */
export default function ProductsPage() {
  return <ProductListing />;
}