import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bookshelf",
  description: "Sök böcker via Open Library",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
