export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading"
      className="min-h-[calc(100vh-156px)] bg-gray-1"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        {/* Loading header */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="w-full max-w-md space-y-3">
            <div className="h-8 w-44 animate-pulse rounded-md bg-gray-3 sm:h-9" />

            <div className="h-4 w-64 animate-pulse rounded-md bg-gray-3" />
          </div>

          <div className="hidden h-10 w-32 animate-pulse rounded-md bg-gray-3 sm:block" />
        </div>

        {/* Main loading content */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* Main content */}
          <section className="overflow-hidden rounded-[10px] border border-gray-3 bg-white shadow-1">
            {/* Section header */}
            <div className="border-b border-gray-3 px-5 py-5 sm:px-7">
              <div className="h-5 w-32 animate-pulse rounded-md bg-gray-3" />
            </div>

            {/* Skeleton items */}
            <div className="divide-y divide-gray-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:px-7"
                >
                  {/* Image */}
                  <div className="h-24 w-full animate-pulse rounded-lg bg-gray-1 sm:h-24 sm:w-24 sm:shrink-0" />

                  {/* Product information */}
                  <div className="flex-1 space-y-3">
                    <div className="h-5 w-3/4 animate-pulse rounded-md bg-gray-3" />

                    <div className="h-4 w-1/3 animate-pulse rounded-md bg-gray-3" />

                    <div className="h-4 w-1/2 animate-pulse rounded-md bg-gray-3" />
                  </div>

                  {/* Price / quantity */}
                  <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end">
                    <div className="h-5 w-20 animate-pulse rounded-md bg-gray-3" />

                    <div className="h-10 w-24 animate-pulse rounded-md bg-gray-3" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sidebar */}
          <aside className="h-fit overflow-hidden rounded-[10px] border border-gray-3 bg-white shadow-1">
            {/* Sidebar header */}
            <div className="border-b border-gray-3 px-5 py-5 sm:px-7">
              <div className="h-6 w-32 animate-pulse rounded-md bg-gray-3" />
            </div>

            <div className="space-y-5 px-5 py-6 sm:px-7">
              {/* Summary rows */}
              <div className="flex items-center justify-between">
                <div className="h-4 w-20 animate-pulse rounded-md bg-gray-3" />
                <div className="h-4 w-20 animate-pulse rounded-md bg-gray-3" />
              </div>

              <div className="flex items-center justify-between">
                <div className="h-4 w-24 animate-pulse rounded-md bg-gray-3" />
                <div className="h-4 w-16 animate-pulse rounded-md bg-gray-3" />
              </div>

              <div className="border-t border-gray-3 pt-5">
                <div className="flex items-center justify-between">
                  <div className="h-6 w-16 animate-pulse rounded-md bg-gray-3" />
                  <div className="h-6 w-24 animate-pulse rounded-md bg-gray-3" />
                </div>
              </div>

              {/* CTA */}
              <div className="h-12 w-full animate-pulse rounded-md bg-gray-3" />
            </div>
          </aside>
        </div>

        {/* Loading indicator */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <span
            aria-hidden="true"
            className="h-2 w-2 animate-bounce rounded-full bg-orange [animation-delay:-0.3s]"
          />

          <span
            aria-hidden="true"
            className="h-2 w-2 animate-bounce rounded-full bg-orange [animation-delay:-0.15s]"
          />

          <span
            aria-hidden="true"
            className="h-2 w-2 animate-bounce rounded-full bg-orange"
          />

          <span className="sr-only">
            Loading Wild Fork content...
          </span>
        </div>
      </div>
    </main>
  );
}