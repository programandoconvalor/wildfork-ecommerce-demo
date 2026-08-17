import type { Metadata } from "next";

import Checkout from "@/components/Checkout";

export const metadata: Metadata = {
  title: "Checkout | Wild Fork",
  description:
    "Complete your order securely and continue with the checkout process at Wild Fork.",
};

export default function CheckoutPage() {
  return (
    <main>
      <Checkout />
    </main>
  );
}