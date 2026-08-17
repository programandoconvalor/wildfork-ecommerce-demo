"use client";

import Image from "next/image";
import { useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export function ProductGallery({
  images,
  title,
}: ProductGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] =
    useState<SwiperInstance | null>(null);

  const productImages = images.length > 0 ? images : [];

  if (productImages.length === 0) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
        <span className="text-sm text-gray-500">
          No images available
        </span>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Main product image */}
      <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white">
        <Swiper
          modules={[Navigation, Thumbs]}
          navigation
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed
                ? thumbsSwiper
                : null,
          }}
          spaceBetween={16}
          slidesPerView={1}
          className="product-gallery-main"
        >
          {productImages.map((image, index) => (
            <SwiperSlide key={`${image}-${index}`}>
              <div className="relative aspect-square w-full">
                <Image
                  src={image}
                  alt={`${title} - image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-4"
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbnail gallery */}
      {productImages.length > 1 && (
        <div className="mt-4">
          <Swiper
            onSwiper={setThumbsSwiper}
            modules={[Thumbs]}
            spaceBetween={12}
            slidesPerView={4}
            watchSlidesProgress
            breakpoints={{
              640: {
                slidesPerView: 5,
              },
              1024: {
                slidesPerView: 6,
              },
            }}
            className="product-gallery-thumbs"
          >
            {productImages.map((image, index) => (
              <SwiperSlide key={`thumb-${image}-${index}`}>
                <div className="relative aspect-square cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white transition hover:border-gray-400">
                  <Image
                    src={image}
                    alt={`${title} thumbnail ${index + 1}`}
                    fill
                    sizes="100px"
                    className="object-contain p-1"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}