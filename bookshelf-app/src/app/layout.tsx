import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bookshelf",
  description: "Sök böcker via Open Library",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body>
        {/* Skip to content */}
        <a href="#main" className="skip-link">
          Hoppa till innehåll
        </a>

        {/* Header / Navigation */}
        <header className="site-header" role="banner">
          <div className="container header-inner">
            <Link href="/" className="brand" aria-label="Bookshelf startsida">
              📚 Bokhyllan
            </Link>
          </div>
        </header>

        {/* Main content */}
        <main id="main" className="container" role="main" tabIndex={-1}>
          {children}
        </main>

        <footer className="site-footer" role="contentinfo">
          <div className="container">
            <small>
              &copy; {new Date().getFullYear()} Library of The Boethius family
            </small>
          </div>
        </footer>
      </body>
    </html>
  );
}
