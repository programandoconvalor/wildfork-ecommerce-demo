import type { Metadata } from "next";

import Home from "@/components/Home";

export const metadata: Metadata = {
  title: "Wild Fork | E-commerce Demo",
  description:
    "Wild Fork e-commerce demo built with Next.js, React, TypeScript.",
};

export default function HomePage() {
  return <Home />;
}