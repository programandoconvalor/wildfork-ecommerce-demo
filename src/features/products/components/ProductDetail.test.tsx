// @vitest-environment jsdom

import "@testing-library/jest-dom";

import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";

import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { ProductDetail } from "./ProductDetail";
import { useProduct } from "../hooks/use-product";

import { addItem } from "@/features/cart/store/cart.slice";

/*
 * ---------------------------------------------------------
 * Mocks
 * ---------------------------------------------------------
 */

const mocks = vi.hoisted(() => ({
  dispatch: vi.fn(),
  toastSuccess: vi.fn(),
  refetch: vi.fn(),
}));

/*
 * Product hook
 */
vi.mock("../hooks/use-product", () => ({
  useProduct: vi.fn(),
}));

/*
 * Next navigation
 */
vi.mock("next/navigation", () => ({
  useParams: () => ({
    id: "1",
  }),
}));

/*
 * Redux
 */
vi.mock("react-redux", () => ({
  useDispatch: () => mocks.dispatch,
}));

/*
 * Toast
 */
vi.mock("react-hot-toast", () => ({
  toast: {
    success: mocks.toastSuccess,
  },
}));

/*
 * ProductGallery
 *
 * We don't want ProductGallery implementation
 * to affect ProductDetail tests.
 */
vi.mock("./ProductGallery", () => ({
  ProductGallery: ({
    images,
    title,
  }: {
    images: string[];
    title: string;
  }) => (
    <div data-testid="product-gallery">
      <span>{title}</span>

      {images.map((image) => (
        <img
          key={image}
          src={image}
          alt={title}
        />
      ))}
    </div>
  ),
}));

/*
 * ---------------------------------------------------------
 * Typed hook mock
 * ---------------------------------------------------------
 */

const mockedUseProduct =
  vi.mocked(useProduct);

/*
 * ---------------------------------------------------------
 * Test product
 * ---------------------------------------------------------
 */

const product = {
  id: 1,
  title: "Essence Mascara Lash Princess",
  description:
    "A popular mascara known for its volumizing and lengthening effects.",
  category: "beauty",
  price: 9.99,
  discountPercentage: 0,
  rating: 4.5,
  reviews: [],
  stock: 10,
  thumbnail: "thumbnail.jpg",
  images: [
    "image-1.jpg",
    "image-2.jpg",
  ],
};

/*
 * ---------------------------------------------------------
 * Tests
 * ---------------------------------------------------------
 */

describe("ProductDetail", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mocks.refetch.mockReset();

    mockedUseProduct.mockReturnValue({
      data: product,
      isLoading: false,
      isError: false,
      error: null,
      refetch: mocks.refetch,
    } as unknown as ReturnType<
      typeof useProduct
    >);
  });

  /*
   * Loading
   */
  it("shows loading state while product is loading", () => {
    mockedUseProduct.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
      refetch: mocks.refetch,
    } as unknown as ReturnType<
      typeof useProduct
    >);

    render(<ProductDetail />);

    expect(
      screen.queryByText(
        "Essence Mascara Lash Princess",
      ),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: /add .* to cart/i,
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText(
        "Product description",
      ),
    ).not.toBeInTheDocument();
  });

  /*
   * Error
   */
  it("shows error state when the product cannot be loaded", () => {
    mockedUseProduct.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error(
        "Failed to load product",
      ),
      refetch: mocks.refetch,
    } as unknown as ReturnType<
      typeof useProduct
    >);

    render(<ProductDetail />);

    expect(
      screen.getByRole("heading", {
        name: "Product not found",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Failed to load product",
      ),
    ).toBeInTheDocument();

    const retryButton =
      screen.getByRole("button", {
        name: "Try again",
      });

    expect(retryButton).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: "Browse products",
      }),
    ).toHaveAttribute(
      "href",
      "/products",
    );

    fireEvent.click(retryButton);

    expect(
      mocks.refetch,
    ).toHaveBeenCalledTimes(1);
  });

  /*
   * Product information
   */
  it("renders product information", () => {
    render(<ProductDetail />);

    expect(
      screen.getByRole("heading", {
        name: product.title,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getAllByText(
        product.category,
      ).length,
    ).toBeGreaterThan(0);

    expect(
      screen.getByText("$9.99"),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "In stock · 10 available",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Product description",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        product.description,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByTestId(
        "product-gallery",
      ),
    ).toBeInTheDocument();
  });

  /*
   * Images
   */
  it("renders the product images", () => {
    render(<ProductDetail />);

    const images =
      screen.getAllByRole("img", {
        name: product.title,
      });

    expect(images).toHaveLength(2);

    expect(images[0]).toHaveAttribute(
      "src",
      "image-1.jpg",
    );

    expect(images[1]).toHaveAttribute(
      "src",
      "image-2.jpg",
    );
  });

  /*
   * Add to cart
   */
  it("adds an available product to the cart", () => {
    render(<ProductDetail />);

    const addButton =
      screen.getByRole("button", {
        name: /add .* to cart/i,
      });

    expect(addButton).toBeEnabled();

    fireEvent.click(addButton);

    expect(
      mocks.dispatch,
    ).toHaveBeenCalledTimes(1);

    expect(
      mocks.dispatch,
    ).toHaveBeenCalledWith(
      addItem({
        ...product,
        quantity: 1,
        discountedPrice: product.price,
      }),
    );

    expect(
      mocks.toastSuccess,
    ).toHaveBeenCalledTimes(1);

    expect(
      mocks.toastSuccess,
    ).toHaveBeenCalledWith(
      "Product added to cart",
    );
  });

  /*
   * Out of stock
   */
  it("shows out of stock state", () => {
    const outOfStockProduct = {
      ...product,
      stock: 0,
    };

    mockedUseProduct.mockReturnValue({
      data: outOfStockProduct,
      isLoading: false,
      isError: false,
      error: null,
      refetch: mocks.refetch,
    } as unknown as ReturnType<
      typeof useProduct
    >);

    render(<ProductDetail />);

    const outOfStockMessages =
      screen.getAllByText(
        "Out of stock",
      );

    expect(
      outOfStockMessages.length,
    ).toBeGreaterThan(0);

    const addButton =
      screen.getByRole("button", {
        name: /out of stock/i,
      });

    expect(addButton).toBeDisabled();

    fireEvent.click(addButton);

    expect(
      mocks.dispatch,
    ).not.toHaveBeenCalled();

    expect(
      mocks.toastSuccess,
    ).not.toHaveBeenCalled();
  });
});