"use client";

import { useState, useEffect } from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { ModalProvider } from "../context/QuickViewModalContext";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";

import { ReduxProvider } from "@/redux/provider";
import { QueryProvider } from "@/lib/query/query-provider";

import { ProductFiltersProvider } from "@/features/products/context/ProductFiltersContext";

import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import PreviewSliderModal from "@/components/Common/PreviewSlider";

import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
        {loading ? (
          <PreLoader />
        ) : (
          <>
            <ReduxProvider>
              <QueryProvider>
                {/* 
                  Global product filters.
                  Header and /products share the same filter state.
                */}
                <ProductFiltersProvider>
                  <CartModalProvider>
                    <ModalProvider>
                      <PreviewSliderProvider>
                        <Header />

                        {children}

                        <QuickViewModal />
                        <CartSidebarModal />
                        <PreviewSliderModal />
                      </PreviewSliderProvider>
                    </ModalProvider>
                  </CartModalProvider>
                </ProductFiltersProvider>
              </QueryProvider>
            </ReduxProvider>

            <ScrollToTop />

            <Footer />
          </>
        )}
    </>
  );
}