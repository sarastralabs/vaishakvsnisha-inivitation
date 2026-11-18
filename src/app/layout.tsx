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


export const metadata: Metadata = {
  title: "Vaishak & Nisha | Wedding Invitation",
  description: "You are invited to celebrate the wedding of Vaishak and Nisha.",
  robots: { index: false, follow: false },
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
