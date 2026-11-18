import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Great_Vibes } from "next/font/google";
import { preload } from "react-dom";
import "./globals.css";
import { TextureDefs } from "@/components/Textures";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-corm",
});
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-dm" });
const script = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-script" });


const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vaishakvsnisha-inivitation.vercel.app";
const title = "Vaishak & Nisha | Wedding Invitation";
const description = "You are invited to celebrate the wedding of Vaishak and Nisha: Mehendi 27 November, Marriage 29 November, Reception 2 December 2026.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  robots: { index: false, follow: false },
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/video/reel-poster.jpg", width: 1280, height: 720, alt: "Vaishak and Nisha by the sea" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/video/reel-poster.jpg"] },
};

export const viewport: Viewport = { themeColor: "#f3ece7" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  preload("/video/reel-poster.jpg", { as: "image", fetchPriority: "high" });
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${script.variable}`}>
      <body>
        <TextureDefs />
        {children}
      </body>
    </html>
  );
}
