import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <style>{`
        .wf-not-found {
          min-height: calc(100vh - 180px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 64px 24px;
          background: #f7f8fa;
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
          box-sizing: border-box;
        }

        .wf-not-found *,
        .wf-not-found *::before,
        .wf-not-found *::after {
          box-sizing: border-box;
        }

        .wf-not-found__container {
          width: 100%;
          max-width: 720px;
        }

        .wf-not-found__card {
          position: relative;
          overflow: hidden;
          width: 100%;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          box-shadow:
            0 20px 45px rgba(31, 42, 90, 0.08),
            0 4px 12px rgba(31, 42, 90, 0.04);
          text-align: center;
        }

        .wf-not-found__accent {
          width: 100%;
          height: 5px;
          background: #f15a29;
        }

        .wf-not-found__content {
          padding: 56px 48px 52px;
        }

        .wf-not-found__icon {
          width: 92px;
          height: 92px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #fff4ef;
          color: #f15a29;
        }

        .wf-not-found__icon svg {
          width: 46px;
          height: 46px;
        }

        .wf-not-found__badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 26px;
          padding: 7px 13px;
          border-radius: 999px;
          background: #f3f4f6;
          color: #68708a;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .wf-not-found__title {
          margin: 18px 0 0;
          color: #1f2a5a;
          font-size: clamp(30px, 5vw, 42px);
          line-height: 1.15;
          font-weight: 700;
          letter-spacing: -0.025em;
        }

        .wf-not-found__description {
          max-width: 520px;
          margin: 16px auto 0;
          color: #68708a;
          font-size: 15px;
          line-height: 1.7;
        }

        .wf-not-found__actions {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          margin-top: 32px;
        }

        .wf-not-found__button {
          min-height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 25px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition:
            background-color 180ms ease,
            border-color 180ms ease,
            color 180ms ease,
            transform 180ms ease,
            box-shadow 180ms ease;
        }

        .wf-not-found__button:hover {
          transform: translateY(-1px);
        }

        .wf-not-found__button:focus-visible {
          outline: 3px solid rgba(241, 90, 41, 0.25);
          outline-offset: 3px;
        }

        .wf-not-found__button--primary {
          color: #ffffff;
          background: #1f2a5a;
          border: 1px solid #1f2a5a;
          box-shadow: 0 6px 14px rgba(31, 42, 90, 0.14);
        }

        .wf-not-found__button--primary:hover {
          color: #ffffff;
          background: #f15a29;
          border-color: #f15a29;
          box-shadow: 0 8px 18px rgba(241, 90, 41, 0.2);
        }

        .wf-not-found__button--secondary {
          color: #1f2a5a;
          background: #ffffff;
          border: 1px solid #d9dce4;
        }

        .wf-not-found__button--secondary:hover {
          color: #ffffff;
          background: #1f2a5a;
          border-color: #1f2a5a;
        }

        .wf-not-found__footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          margin-top: 34px;
          padding-top: 22px;
          border-top: 1px solid #edf0f3;
          color: #8a91a3;
          font-size: 12px;
          line-height: 1.5;
        }

        .wf-not-found__dot {
          width: 7px;
          height: 7px;
          flex: 0 0 7px;
          border-radius: 50%;
          background: #f15a29;
        }

        .wf-not-found__brand {
          position: absolute;
          top: 25px;
          left: 28px;
          display: flex;
          align-items: center;
          gap: 9px;
          color: #1f2a5a;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 19px;
          font-weight: 700;
        }

        .wf-not-found__brand-mark {
          width: 25px;
          height: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid #f15a29;
          border-radius: 50%;
          color: #f15a29;
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            sans-serif;
          font-size: 14px;
          font-weight: 800;
        }

        @media (max-width: 640px) {
          .wf-not-found {
            min-height: calc(100vh - 100px);
            padding: 28px 16px;
          }

          .wf-not-found__card {
            border-radius: 16px;
          }

          .wf-not-found__content {
            padding: 72px 22px 30px;
          }

          .wf-not-found__brand {
            top: 20px;
            left: 20px;
            font-size: 17px;
          }

          .wf-not-found__brand-mark {
            width: 23px;
            height: 23px;
            font-size: 12px;
          }

          .wf-not-found__icon {
            width: 76px;
            height: 76px;
          }

          .wf-not-found__icon svg {
            width: 38px;
            height: 38px;
          }

          .wf-not-found__badge {
            margin-top: 20px;
            font-size: 10px;
          }

          .wf-not-found__title {
            margin-top: 15px;
            font-size: 30px;
          }

          .wf-not-found__description {
            font-size: 14px;
            line-height: 1.65;
          }

          .wf-not-found__actions {
            flex-direction: column;
            width: 100%;
            margin-top: 27px;
          }

          .wf-not-found__button {
            width: 100%;
          }

          .wf-not-found__footer {
            align-items: flex-start;
            text-align: left;
          }
        }

        @media (min-width: 641px) and (max-width: 900px) {
          .wf-not-found {
            padding: 48px 24px;
          }

          .wf-not-found__content {
            padding: 52px 36px 46px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .wf-not-found__button {
            transition: none;
          }

          .wf-not-found__button:hover {
            transform: none;
          }
        }
      `}</style>

      <main className="wf-not-found">
        <div className="wf-not-found__container">
          <section
            className="wf-not-found__card"
            aria-labelledby="not-found-title"
          >
            {/* Wild Fork branding */}
            <div className="wf-not-found__brand" aria-label="Wild Fork">
              <span className="wf-not-found__brand-mark">
                W
              </span>

              <span>Wild Fork</span>
            </div>

            {/* Orange brand accent */}
            <div
              className="wf-not-found__accent"
              aria-hidden="true"
            />

            <div className="wf-not-found__content">
              {/* Error icon */}
              <div
                className="wf-not-found__icon"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 3L21 20H3L12 3Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M12 9V13"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />

                  <circle
                    cx="12"
                    cy="16.5"
                    r="0.8"
                    fill="currentColor"
                  />
                </svg>
              </div>

              {/* Status */}
              <span className="wf-not-found__badge">
                404 · Page not found
              </span>

              {/* Title */}
              <h1
                id="not-found-title"
                className="wf-not-found__title"
              >
                We couldn&apos;t find that page
              </h1>

              {/* Description */}
              <p className="wf-not-found__description">
                The page you&apos;re looking for may have been
                moved, removed, or the address may be incorrect.
                Let&apos;s get you back to the Wild Fork catalog.
              </p>

              {/* Actions */}
              <div className="wf-not-found__actions">
                <Link
                  href="/products"
                  className="wf-not-found__button wf-not-found__button--primary"
                >
                  Browse products
                </Link>

                <Link
                  href="/"
                  className="wf-not-found__button wf-not-found__button--secondary"
                >
                  Go to homepage
                </Link>
              </div>

              {/* Supporting message */}
              <div className="wf-not-found__footer">
                <span
                  className="wf-not-found__dot"
                  aria-hidden="true"
                />

                <span>
                  Continue shopping and discover products from
                  our catalog.
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}