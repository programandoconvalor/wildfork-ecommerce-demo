"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Scroll smoothly to the top of the page.
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    /**
     * Show the button after the user has
     * scrolled down 300px.
     */
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener(
      "scroll",
      toggleVisibility,
      { passive: true },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        toggleVisibility,
      );
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className="
  group
  fixed
  bottom-6
  right-4
  z-999
  flex
  h-11
  w-11
  items-center
  justify-center
  rounded-lg
  bg-dark
  text-white
  shadow-2
  transition-all
  duration-200
  hover:bg-orange
  hover:shadow-3
  focus:outline-none
  focus:ring-2
  focus:ring-orange/30
  focus:ring-offset-2
  active:scale-95
  sm:bottom-7
  sm:right-7
  sm:h-12
  sm:w-12
"
    >
      <svg
        className="
          h-5
          w-5
          fill-current
          transition-transform
          duration-200
          group-hover:-translate-y-0.5
        "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        aria-hidden="true"
      >
        <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
      </svg>
    </button>
  );
}