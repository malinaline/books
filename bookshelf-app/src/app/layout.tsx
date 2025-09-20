import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { GeistSans } from "geist/font/sans";
import { Geist, Geist_Mono } from "next/font/google";

export const metadata: Metadata = {
  title: "Bokhyllan",
  description: "Sök böcker via Open Library",
  icons: {
    icon: "/stamp.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const year = new Date().getFullYear();

  return (
    <html lang="sv" className={`${GeistSans.className} antialiased`}>
      <body>
        <a href="#main" className="skip-link">
          Hoppa till innehåll
        </a>

        <header className="site-header">
          <div className="container header-inner">
            <Link href="/" className="brand" aria-label="Bokhyllan startsida">
              Bokhyllan
            </Link>
          </div>
        </header>

        <main id="main" className="container" tabIndex={-1}>
          {children}
        </main>

        <footer className="site-footer">
          <div className="container">
            <small>&copy; {year} Library of The Boethius family</small>
          </div>
        </footer>
      </body>
    </html>
  );
}
