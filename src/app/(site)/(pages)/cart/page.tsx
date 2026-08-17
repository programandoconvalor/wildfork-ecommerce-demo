import type { Metadata } from "next";

import Cart from "@/components/Cart";

export const metadata: Metadata = {
  title: "Shopping Cart | Wild Fork",
  description:
    "Review your selected products and continue with your purchase at Wild Fork.",
};

export default function CartPage() {
  return <Cart />;
}