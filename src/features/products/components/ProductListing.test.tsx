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

import {
  ProductFiltersProvider,
} from "../context/ProductFiltersContext";

vi.mock("../hooks/use-products", () => ({
  useProducts: vi.fn(),
}));

/**
 * Mock ProductGrid so these tests focus only on
 * ProductListing filtering and sorting behavior.
 */
vi.mock("./ProductGrid", () => ({
  ProductGrid: ({
    products,
  }: {
    products: Array<{
      id: number;
      title: string;
      description: string;
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

          <p>{product.description}</p>

          <span>{product.price}</span>

          <span>{product.category}</span>
        </article>
      ))}
    </div>
  ),
}));

const mockedUseProducts =
  vi.mocked(useProducts);

const products = [
  {
    id: 1,
    title: "Essence Mascara Lash Princess",
    description:
      "A popular mascara known for its volumizing and lengthening effects.",
    price: 9.99,
    category: "beauty",
  },
  {
    id: 2,
    title: "Red Lipstick",
    description:
      "A classic red lipstick with a smooth and long-lasting finish.",
    price: 12.99,
    category: "beauty",
  },
  {
    id: 3,
    title: "Apple",
    description:
      "Fresh and crisp apple suitable for everyday consumption.",
    price: 1.99,
    category: "groceries",
  },
];

/**
 * Render ProductListing with the same
 * ProductFiltersProvider required by
 * the production component.
 */
const renderProductListing = () => {
  return render(
    <ProductFiltersProvider>
      <ProductListing />
    </ProductFiltersProvider>,
  );
};

/**
 * The desktop and mobile sort controls both
 * have the accessible name "Sort by".
 *
 * The first combobox corresponds to the desktop
 * filter panel.
 */
const getDesktopSortSelect = () => {
  const sortSelects =
    screen.getAllByRole("combobox", {
      name: "Sort by",
    });

  return sortSelects[0];
};

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
    } as unknown as ReturnType<
      typeof useProducts
    >);
  });

  /**
   * -------------------------------------------------------
   * Product rendering
   * -------------------------------------------------------
   */

  it("renders the products", () => {
    renderProductListing();

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
  });

  /**
   * -------------------------------------------------------
   * Search filtering
   * -------------------------------------------------------
   */

  it("filters products by search", () => {
    renderProductListing();

    const searchInput =
      screen.getByRole("searchbox", {
        name: "Search",
      });

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

  /**
   * -------------------------------------------------------
   * Category filtering
   * -------------------------------------------------------
   *
   * ProductListing uses radio buttons for categories.
   */

  it("filters products by category", () => {
    renderProductListing();

    const beautyRadio =
      screen.getByRole("radio", {
        name: "beauty",
      });

    fireEvent.click(beautyRadio);

    expect(
      beautyRadio,
    ).toBeChecked();

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

  /**
   * -------------------------------------------------------
   * Price sorting - ascending
   * -------------------------------------------------------
   */

  it("sorts products from low to high", () => {
    renderProductListing();

    const sortSelect =
      getDesktopSortSelect();

    fireEvent.change(sortSelect, {
      target: {
        value: "asc",
      },
    });

    expect(sortSelect).toHaveValue("asc");

    const cards =
      screen.getAllByTestId(
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

  /**
   * -------------------------------------------------------
   * Price sorting - descending
   * -------------------------------------------------------
   */

  it("sorts products from high to low", () => {
    renderProductListing();

    const sortSelect =
      getDesktopSortSelect();

    fireEvent.change(sortSelect, {
      target: {
        value: "desc",
      },
    });

    expect(sortSelect).toHaveValue("desc");

    const cards =
      screen.getAllByTestId(
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

  /**
   * -------------------------------------------------------
   * Clear All visibility
   * -------------------------------------------------------
   */

  it("shows Clear All when a filter is active", () => {
    renderProductListing();

    const searchInput =
      screen.getByRole("searchbox", {
        name: "Search",
      });

    fireEvent.change(searchInput, {
      target: {
        value: "mascara",
      },
    });

    expect(
      screen.getByRole("button", {
        name: "Clear All",
      }),
    ).toBeInTheDocument();
  });

  /**
   * -------------------------------------------------------
   * Clear all filters
   * -------------------------------------------------------
   */

  it("clears all filters", () => {
    renderProductListing();

    const searchInput =
      screen.getByRole("searchbox", {
        name: "Search",
      });

    const beautyRadio =
      screen.getByRole("radio", {
        name: "beauty",
      });

    const sortSelect =
      getDesktopSortSelect();

    /**
     * Apply search filter.
     */
    fireEvent.change(searchInput, {
      target: {
        value: "mascara",
      },
    });

    /**
     * Apply category filter.
     */
    fireEvent.click(beautyRadio);

    /**
     * Apply sorting.
     */
    fireEvent.change(sortSelect, {
      target: {
        value: "desc",
      },
    });

    expect(searchInput).toHaveValue(
      "mascara",
    );

    expect(beautyRadio).toBeChecked();

    expect(sortSelect).toHaveValue(
      "desc",
    );

    /**
     * Clear all filters.
     */
    const clearButton =
      screen.getByRole("button", {
        name: "Clear All",
      });

    fireEvent.click(clearButton);

    /**
     * Search is reset.
     */
    expect(searchInput).toHaveValue("");

    /**
     * Category is reset to "All categories".
     */
    expect(
      screen.getByRole("radio", {
        name: "All categories",
      }),
    ).toBeChecked();

    expect(beautyRadio).not.toBeChecked();

    /**
     * Sort is reset.
     */
    expect(sortSelect).toHaveValue(
      "default",
    );

    /**
     * All products are visible again.
     */
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

    /**
     * Clear All should disappear when
     * no filters are active.
     */
    expect(
      screen.queryByRole("button", {
        name: "Clear All",
      }),
    ).not.toBeInTheDocument();
  });

  /**
   * -------------------------------------------------------
   * Empty state
   * -------------------------------------------------------
   */

  it("shows the empty state when no products match", () => {
    renderProductListing();

    const searchInput =
      screen.getByRole("searchbox", {
        name: "Search",
      });

    fireEvent.change(searchInput, {
      target: {
        value: "nonexistent-product",
      },
    });

    expect(
      screen.getByText(
        "No products found",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Try changing your search or filters.",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Clear All",
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByTestId(
        "product-grid",
      ),
    ).not.toBeInTheDocument();
  });
});