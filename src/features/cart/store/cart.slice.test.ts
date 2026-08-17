// @vitest-environment jsdom
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import type { RootState } from "@/redux/store";
import type { Product } from "@/features/products/types/product.types";

import {
  addItem,
  clearCart,
  hydrateCart,
  removeItem,
  selectCartItemCount,
  selectCartItems,
  selectCartSubtotal,
  selectTotalPrice,
  updateQuantity,
} from "./cart.slice";

import cartReducer from "./cart.slice";

describe("cart.slice", () => {
  /**
   * =========================================================
   * TEST PRODUCTS
   * =========================================================
   *
   * These fixtures follow the current canonical Product model.
   */
  const product: Product = {
    id: 1,
    title: "Essence Mascara Lash Princess",
    description: "Mascara product",
    category: "beauty",
    price: 9.99,
    discountPercentage: 0,
    rating: 4.5,
    stock: 10,
    thumbnail: "thumbnail.jpg",
    images: ["image-1.jpg"],
    reviews: [],
  };

  const secondProduct: Product = {
    id: 2,
    title: "Red Lipstick",
    description: "Lipstick product",
    category: "beauty",
    price: 12.99,
    discountPercentage: 0,
    rating: 4.2,
    stock: 5,
    thumbnail: "lipstick.jpg",
    images: ["lipstick-1.jpg"],
    reviews: [],
  };

  /**
   * =========================================================
   * ROOT STATE HELPER
   * =========================================================
   *
   * Cart selectors only depend on the `cart` slice.
   *
   * The test creates the minimum state required by the
   * selectors and casts it to RootState because the complete
   * Redux store also contains unrelated application slices.
   */
  const createRootState = (
    items = cartReducer(undefined, {
      type: "init",
    }).items,
  ): RootState =>
    ({
      cart: {
        items,
      },
    }) as unknown as RootState;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  /**
   * =========================================================
   * ADD ITEM
   * =========================================================
   */

  it("adds a product to the cart", () => {
    const state = cartReducer(
      undefined,
      addItem(product),
    );

    expect(state.items).toHaveLength(1);

    expect(state.items[0].id).toBe(1);

    expect(state.items[0].title).toBe(
      "Essence Mascara Lash Princess",
    );

    expect(state.items[0].quantity).toBe(1);

    expect(
      state.items[0].discountedPrice,
    ).toBe(9.99);
  });

  /**
   * =========================================================
   * ADD EXISTING ITEM
   * =========================================================
   */

  it("increments quantity when adding the same product", () => {
    let state = cartReducer(
      undefined,
      addItem(product),
    );

    state = cartReducer(
      state,
      addItem({
        ...product,
        quantity: 2,
      }),
    );

    expect(state.items).toHaveLength(1);

    expect(state.items[0].quantity).toBe(3);
  });

  /**
   * =========================================================
   * ADD MULTIPLE PRODUCTS
   * =========================================================
   */

  it("adds multiple different products", () => {
    let state = cartReducer(
      undefined,
      addItem(product),
    );

    state = cartReducer(
      state,
      addItem(secondProduct),
    );

    expect(state.items).toHaveLength(2);

    expect(state.items[0].id).toBe(1);
    expect(state.items[1].id).toBe(2);
  });

  /**
   * =========================================================
   * REMOVE ITEM
   * =========================================================
   */

  it("removes a product with removeItem", () => {
    let state = cartReducer(
      undefined,
      addItem(product),
    );

    state = cartReducer(
      state,
      addItem(secondProduct),
    );

    state = cartReducer(
      state,
      removeItem(1),
    );

    expect(state.items).toHaveLength(1);

    expect(state.items[0].id).toBe(2);
  });

  /**
   * =========================================================
   * UPDATE QUANTITY
   * =========================================================
   */

  it("updates product quantity", () => {
    let state = cartReducer(
      undefined,
      addItem(product),
    );

    state = cartReducer(
      state,
      updateQuantity({
        productId: 1,
        quantity: 4,
      }),
    );

    expect(
      state.items[0].quantity,
    ).toBe(4);
  });

  /**
   * =========================================================
   * REMOVE WITH ZERO QUANTITY
   * =========================================================
   */

  it("removes product when updateQuantity receives zero", () => {
    let state = cartReducer(
      undefined,
      addItem(product),
    );

    state = cartReducer(
      state,
      updateQuantity({
        productId: 1,
        quantity: 0,
      }),
    );

    expect(state.items).toHaveLength(0);
  });

  /**
   * =========================================================
   * REMOVE WITH NEGATIVE QUANTITY
   * =========================================================
   */

  it("removes product when updateQuantity receives a negative value", () => {
    let state = cartReducer(
      undefined,
      addItem(product),
    );

    state = cartReducer(
      state,
      updateQuantity({
        productId: 1,
        quantity: -1,
      }),
    );

    expect(state.items).toHaveLength(0);
  });

  /**
   * =========================================================
   * CLEAR CART
   * =========================================================
   */

  it("clears the entire cart", () => {
    let state = cartReducer(
      undefined,
      addItem(product),
    );

    state = cartReducer(
      state,
      addItem(secondProduct),
    );

    expect(state.items).toHaveLength(2);

    state = cartReducer(
      state,
      clearCart(),
    );

    expect(state.items).toHaveLength(0);
  });

  /**
   * =========================================================
   * HYDRATE CART
   * =========================================================
   */

  it("hydrates the cart", () => {
    const persistedItems = [
      {
        ...product,
        quantity: 3,
        discountedPrice: 9.99,
        imgs: {
          thumbnails: ["thumbnail.jpg"],
          previews: ["image-1.jpg"],
        },
      },
    ];

    const state = cartReducer(
      undefined,
      hydrateCart(persistedItems),
    );

    expect(state.items).toHaveLength(1);

    expect(state.items[0].id).toBe(1);

    expect(
      state.items[0].quantity,
    ).toBe(3);
  });

  /**
   * =========================================================
   * CART ITEM COUNT
   * =========================================================
   */

  it("calculates cart item count", () => {
    let state = cartReducer(
      undefined,
      addItem(product),
    );

    state = cartReducer(
      state,
      addItem({
        ...product,
        quantity: 2,
      }),
    );

    state = cartReducer(
      state,
      addItem(secondProduct),
    );

    const rootState = createRootState(
      state.items,
    );

    expect(
      selectCartItemCount(rootState),
    ).toBe(4);
  });

  /**
   * =========================================================
   * CART SUBTOTAL
   * =========================================================
   */

  it("calculates cart subtotal", () => {
    let state = cartReducer(
      undefined,
      addItem(product),
    );

    state = cartReducer(
      state,
      addItem({
        ...product,
        quantity: 2,
      }),
    );

    state = cartReducer(
      state,
      addItem(secondProduct),
    );

    const rootState = createRootState(
      state.items,
    );

    expect(
      selectCartSubtotal(rootState),
    ).toBeCloseTo(
      9.99 * 3 + 12.99,
    );
  });

  /**
   * =========================================================
   * TOTAL PRICE
   * =========================================================
   */

  it("selectTotalPrice returns the cart subtotal", () => {
    const state = cartReducer(
      undefined,
      addItem(product),
    );

    const rootState = createRootState(
      state.items,
    );

    expect(
      selectTotalPrice(rootState),
    ).toBeCloseTo(9.99);
  });

  /**
   * =========================================================
   * CART ITEMS
   * =========================================================
   */

  it("selectCartItems returns all cart items", () => {
    let state = cartReducer(
      undefined,
      addItem(product),
    );

    state = cartReducer(
      state,
      addItem(secondProduct),
    );

    const rootState = createRootState(
      state.items,
    );

    const items = selectCartItems(
      rootState,
    );

    expect(items).toHaveLength(2);

    expect(items[0].id).toBe(1);
    expect(items[1].id).toBe(2);
  });

  /**
   * =========================================================
   * STOCK VALIDATION
   * =========================================================
   */

  it("does not allow adding more items than available stock", () => {
    const productWithLowStock: Product = {
      ...product,
      stock: 3,
    };

    let state = cartReducer(
      undefined,
      addItem(productWithLowStock),
    );

    state = cartReducer(
      state,
      addItem({
        ...productWithLowStock,
        quantity: 5,
      }),
    );

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(3);
  });

  /**
   * =========================================================
   * QUANTITY STOCK LIMIT
   * =========================================================
   */

  it("does not allow quantity to exceed product stock", () => {
    const productWithLowStock: Product = {
      ...product,
      stock: 3,
    };

    let state = cartReducer(
      undefined,
      addItem(productWithLowStock),
    );

    state = cartReducer(
      state,
      updateQuantity({
        productId: productWithLowStock.id,
        quantity: 999,
      }),
    );

    expect(
      state.items[0].quantity,
    ).toBe(3);
  });

  /**
   * =========================================================
   * HYDRATION STOCK LIMIT
   * =========================================================
   */

  it("clamps persisted quantity to available stock", () => {
    const productWithLowStock: Product = {
      ...product,
      stock: 3,
    };

    const persistedItems = [
      {
        ...productWithLowStock,
        quantity: 100,
        discountedPrice:
          productWithLowStock.price,
        imgs: {
          thumbnails: [
            productWithLowStock.thumbnail,
          ],
          previews:
            productWithLowStock.images,
        },
      },
    ];

    const state = cartReducer(
      undefined,
      hydrateCart(persistedItems),
    );

    expect(state.items).toHaveLength(1);

    expect(
      state.items[0].quantity,
    ).toBe(3);
  });

  /**
   * =========================================================
   * OUT OF STOCK
   * =========================================================
   */

  it("does not add products with zero stock", () => {
    const outOfStockProduct: Product = {
      ...product,
      stock: 0,
    };

    const state = cartReducer(
      undefined,
      addItem(outOfStockProduct),
    );

    expect(state.items).toHaveLength(0);
  });
});