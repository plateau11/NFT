import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/context/Theme";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/footer/Footer";
import { NFTProvider } from "@/context/NFTContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NFTProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="dark:bg-nft-dark bg-white min-h-screen">
              <Navbar />
              <div>{children}</div>
              <Footer />
            </div>
            <script
              src="https://kit.fontawesome.com/8a40a6fca5.js"
              crossOrigin="anonymous"
            />
          </ThemeProvider>
        </NFTProvider>
      </body>
    </html>
  );
}
