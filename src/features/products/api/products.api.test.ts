import { afterEach, describe, expect, it, vi } from "vitest";

import {
  getProduct,
  getProducts,
} from "./products.api";

describe("Products API", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("getProducts", () => {
    it("fetches and returns the products successfully", async () => {
      const mockResponse = {
        products: [
          {
            id: 1,
            title: "Essence Mascara Lash Princess",
            description: "A mascara product",
            category: "beauty",
            price: 9.99,
            discountPercentage: 10,
            rating: 4.5,
            stock: 10,
            tags: ["beauty", "mascara"],
            brand: "Essence",
            sku: "BEA-001",
            weight: 1,
            dimensions: {
              width: 1,
              height: 1,
              depth: 1,
            },
            warrantyInformation: "1 year warranty",
            shippingInformation: "Ships within 2 days",
            availabilityStatus: "In Stock",
            reviews: [],
            returnPolicy: "30 days return policy",
            minimumOrderQuantity: 1,
            meta: {
              createdAt: "2025-01-01T00:00:00.000Z",
              updatedAt: "2025-01-01T00:00:00.000Z",
              barcode: "123456789",
              qrCode: "https://example.com/qr",
            },
            images: [
              "https://cdn.dummyjson.com/product-images/beauty/mascara-lash-princess/1.webp",
            ],
            thumbnail:
              "https://cdn.dummyjson.com/product-images/beauty/mascara-lash-princess/thumbnail.webp",
          },
        ],
        total: 1,
        skip: 0,
        limit: 30,
      };

      vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(
          JSON.stringify(mockResponse),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          },
        ),
      );

      const result = await getProducts();

      expect(fetch).toHaveBeenCalledTimes(1);

      expect(fetch).toHaveBeenCalledWith(
        "https://dummyjson.com/products",
      );

      expect(result.products).toHaveLength(1);
      expect(result.products[0].id).toBe(1);
      expect(result.products[0].title).toBe(
        "Essence Mascara Lash Princess",
      );
    });

    it("throws an error when the products request fails", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(null, {
          status: 500,
        }),
      );

      await expect(
        getProducts(),
      ).rejects.toThrow(
        "Failed to fetch products",
      );

      expect(fetch).toHaveBeenCalledTimes(1);

      expect(fetch).toHaveBeenCalledWith(
        "https://dummyjson.com/products",
      );
    });
  });

  describe("getProduct", () => {
    it("fetches and returns a product successfully", async () => {
      const mockProduct = {
        id: 1,
        title: "Essence Mascara Lash Princess",
        description: "A mascara product",
        category: "beauty",
        price: 9.99,
        discountPercentage: 10,
        rating: 4.5,
        stock: 10,
        tags: ["beauty", "mascara"],
        brand: "Essence",
        sku: "BEA-001",
        weight: 1,
        dimensions: {
          width: 1,
          height: 1,
          depth: 1,
        },
        warrantyInformation: "1 year warranty",
        shippingInformation: "Ships within 2 days",
        availabilityStatus: "In Stock",
        reviews: [],
        returnPolicy: "30 days return policy",
        minimumOrderQuantity: 1,
        meta: {
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z",
          barcode: "123456789",
          qrCode: "https://example.com/qr",
        },
        images: [
          "https://cdn.dummyjson.com/product-images/beauty/mascara-lash-princess/1.webp",
        ],
        thumbnail:
          "https://cdn.dummyjson.com/product-images/beauty/mascara-lash-princess/thumbnail.webp",
      };

      vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(
          JSON.stringify(mockProduct),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          },
        ),
      );

      const result = await getProduct(1);

      expect(fetch).toHaveBeenCalledTimes(1);

      expect(fetch).toHaveBeenCalledWith(
        "https://dummyjson.com/products/1",
      );

      expect(result.id).toBe(1);
      expect(result.title).toBe(
        "Essence Mascara Lash Princess",
      );
      expect(result.category).toBe("beauty");
      expect(result.price).toBe(9.99);
    });

    it("throws an error when the product request fails", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(null, {
          status: 404,
        }),
      );

      await expect(
        getProduct(999),
      ).rejects.toThrow(
        "Failed to fetch product",
      );

      expect(fetch).toHaveBeenCalledTimes(1);

      expect(fetch).toHaveBeenCalledWith(
        "https://dummyjson.com/products/999",
      );
    });
  });
});