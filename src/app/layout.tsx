import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dr. Shivani Medical & Dental Care | Premium Clinic in Delhi",
    template: "%s | Dr. Shivani Medical & Dental Care",
  },
  description:
    "Premium dental, skin, and aesthetic treatments by Dr. Shivani Singh (B.D.S, PGDCC, MIDA) in Swaroop Nagar, Delhi. Luxury care for your smile, skin, and confidence.",
  keywords: [
    "dental clinic delhi",
    "skin treatment delhi",
    "cosmetic dentistry",
    "smile design",
    "PRP treatment",
    "hair removal delhi",
    "Dr Shivani Singh",
    "luxury dental clinic",
    "swaroop nagar dentist",
  ],
  openGraph: {
    title: "Dr. Shivani Medical & Dental Care",
    description:
      "Where Science Meets Elegance — Premium dental, skin, and aesthetic care in Delhi.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
