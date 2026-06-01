import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aclan English Coach",
  description: "Personalized grammar, idiom, and pronunciation coaching app.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
