"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type SortOption = "default" | "asc" | "desc";

interface ProductFiltersContextValue {
  searchQuery: string;
  category: string;
  sort: SortOption;

  setSearchQuery: (value: string) => void;
  setCategory: (value: string) => void;
  setSort: (value: SortOption) => void;

  resetFilters: () => void;
}

const ProductFiltersContext =
  createContext<ProductFiltersContextValue | undefined>(undefined);

interface ProductFiltersProviderProps {
  children: ReactNode;
}

export function ProductFiltersProvider({
  children,
}: ProductFiltersProviderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortOption>("default");

  const resetFilters = () => {
    setSearchQuery("");
    setCategory("all");
    setSort("default");
  };

  const value = useMemo(
    () => ({
      searchQuery,
      category,
      sort,
      setSearchQuery,
      setCategory,
      setSort,
      resetFilters,
    }),
    [searchQuery, category, sort],
  );

  return (
    <ProductFiltersContext.Provider value={value}>
      {children}
    </ProductFiltersContext.Provider>
  );
}

export function useProductFilters() {
  const context = useContext(ProductFiltersContext);

  if (!context) {
    throw new Error(
      "useProductFilters must be used within ProductFiltersProvider",
    );
  }

  return context;
}