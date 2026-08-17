import type { Metadata } from "next";

import Error from "@/components/Error";

export const metadata: Metadata = {
  title: "Error | Wild Fork",
  description:
    "Something went wrong while loading the page. Please try again.",
};

export default function ErrorPage() {
  return (
    <main>
      <Error />
    </main>
  );
}