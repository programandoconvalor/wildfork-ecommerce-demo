// @vitest-environment jsdom

import {
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";

import "@testing-library/jest-dom/vitest";

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { ProductListing } from "./ProductListing";
import { useProducts } from "../hooks/use-products";

vi.mock("../hooks/use-products", () => ({
  useProducts: vi.fn(),
}));

/**
 * Mock ProductGrid so this test focuses only on
 * ProductListing behavior.
 */
vi.mock("./ProductGrid", () => ({
  ProductGrid: ({
    products,
  }: {
    products: Array<{
      id: number;
      title: string;
      price: number;
      category: string;
    }>;
  }) => (
    <div data-testid="product-grid">
      {products.map((product) => (
        <article
          key={product.id}
          data-testid="product-card"
        >
          <h2>{product.title}</h2>
          <span>{product.price}</span>
          <span>{product.category}</span>
        </article>
      ))}
    </div>
  ),
}));

const mockedUseProducts = vi.mocked(useProducts);

const products = [
  {
    id: 1,
    title: "Essence Mascara Lash Princess",
    price: 9.99,
    category: "beauty",
  },
  {
    id: 2,
    title: "Red Lipstick",
    price: 12.99,
    category: "beauty",
  },
  {
    id: 3,
    title: "Apple",
    price: 1.99,
    category: "groceries",
  },
];

afterEach(() => {
  cleanup();
});

describe("ProductListing", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockedUseProducts.mockReturnValue({
      data: {
        products,
      },
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof useProducts>);
  });

  it("renders the products", () => {
    render(<ProductListing />);

    expect(
      screen.getByText("Essence Mascara Lash Princess"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Red Lipstick"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Apple"),
    ).toBeInTheDocument();
  });

  it("filters products by search", () => {
    render(<ProductListing />);

    const searchInput = screen.getByRole(
      "searchbox",
      {
        name: "Search products",
      },
    );

    fireEvent.change(searchInput, {
      target: {
        value: "mascara",
      },
    });

    expect(
      screen.getByText(
        "Essence Mascara Lash Princess",
      ),
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Red Lipstick"),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText("Apple"),
    ).not.toBeInTheDocument();
  });

  it("filters products by category", () => {
    render(<ProductListing />);

    const categorySelect = screen.getByRole(
      "combobox",
      {
        name: "Category",
      },
    );

    fireEvent.change(categorySelect, {
      target: {
        value: "beauty",
      },
    });

    expect(
      screen.getByText(
        "Essence Mascara Lash Princess",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Red Lipstick"),
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Apple"),
    ).not.toBeInTheDocument();
  });

  it("sorts products from low to high", () => {
    render(<ProductListing />);

    const sortSelect = screen.getByRole(
      "combobox",
      {
        name: "Sort by price",
      },
    );

    fireEvent.change(sortSelect, {
      target: {
        value: "asc",
      },
    });

    const cards = screen.getAllByTestId(
      "product-card",
    );

    expect(cards).toHaveLength(3);

    expect(cards[0]).toHaveTextContent(
      "Apple",
    );

    expect(cards[1]).toHaveTextContent(
      "Essence Mascara Lash Princess",
    );

    expect(cards[2]).toHaveTextContent(
      "Red Lipstick",
    );
  });

  it("sorts products from high to low", () => {
    render(<ProductListing />);

    const sortSelect = screen.getByRole(
      "combobox",
      {
        name: "Sort by price",
      },
    );

    fireEvent.change(sortSelect, {
      target: {
        value: "desc",
      },
    });

    const cards = screen.getAllByTestId(
      "product-card",
    );

    expect(cards).toHaveLength(3);

    expect(cards[0]).toHaveTextContent(
      "Red Lipstick",
    );

    expect(cards[1]).toHaveTextContent(
      "Essence Mascara Lash Princess",
    );

    expect(cards[2]).toHaveTextContent(
      "Apple",
    );
  });

  it("shows Clear filters when a filter is active", () => {
    render(<ProductListing />);

    const searchInput = screen.getByRole(
      "searchbox",
      {
        name: "Search products",
      },
    );

    fireEvent.change(searchInput, {
      target: {
        value: "mascara",
      },
    });

    expect(
      screen.getByRole("button", {
        name: "Clear filters",
      }),
    ).toBeInTheDocument();
  });

  it("clears all filters", () => {
    render(<ProductListing />);

    const searchInput = screen.getByRole(
      "searchbox",
      {
        name: "Search products",
      },
    );

    const categorySelect = screen.getByRole(
      "combobox",
      {
        name: "Category",
      },
    );

    const sortSelect = screen.getByRole(
      "combobox",
      {
        name: "Sort by price",
      },
    );

    fireEvent.change(searchInput, {
      target: {
        value: "mascara",
      },
    });

    fireEvent.change(categorySelect, {
      target: {
        value: "beauty",
      },
    });

    fireEvent.change(sortSelect, {
      target: {
        value: "desc",
      },
    });

    const clearButton = screen.getByRole(
      "button",
      {
        name: "Clear filters",
      },
    );

    fireEvent.click(clearButton);

    expect(searchInput).toHaveValue("");
    expect(categorySelect).toHaveValue("all");
    expect(sortSelect).toHaveValue("default");

    expect(
      screen.getByText(
        "Essence Mascara Lash Princess",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Red Lipstick"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Apple"),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "Clear filters",
      }),
    ).not.toBeInTheDocument();
  });

  it("shows the empty state when no products match", () => {
    render(<ProductListing />);

    const searchInput = screen.getByRole(
      "searchbox",
      {
        name: "Search products",
      },
    );

    fireEvent.change(searchInput, {
      target: {
        value: "nonexistent-product",
      },
    });

    expect(
      screen.getByText("No products found"),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Try changing your search or filters.",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Clear filters",
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByTestId("product-grid"),
    ).not.toBeInTheDocument();
  });
});