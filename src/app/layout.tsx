import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MedVista Hospital",
  description:
    "MedVista Hospital Management System - Your health, our priority. Book appointments, access records, and connect with top doctors.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
        {/* Analytics placeholder - replace with your tracking ID */}
        <script
          async
          src="https://analytics-placeholder.com/script.js"
          data-id="G-XXXXXXXXXX"
        />
      </body>
    </html>
  );
}
