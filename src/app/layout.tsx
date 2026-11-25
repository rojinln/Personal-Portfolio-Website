import type { Metadata, Viewport } from "next";
import { Nunito, Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";

const pixel = Press_Start_2P({ variable: "--font-pixel", weight: "400", subsets: ["latin"] });
const terminal = VT323({ variable: "--font-term", weight: "400", subsets: ["latin"] });
const body = Nunito({ variable: "--font-body", subsets: ["latin"], weight: ["400", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "Rojin Lohrasbinejad · Software Engineer",
  description:
    "Rojin Lohrasbinejad, software engineer in Vancouver working on backend systems, data pipelines and machine learning.",
};

export const viewport: Viewport = { themeColor: "#0c0812" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${pixel.variable} ${terminal.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
