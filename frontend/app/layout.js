"use client"
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThirdwebProvider } from "thirdweb/react";
require('dotenv').config()
import { client } from "./client";
import { LotteryAppContextProvider } from "./context/LotteryAppContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata = {
//   title: "GoldRush uZAR",
//   description: "Enter and Win",
// };



export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      <ThirdwebProvider>
    <LotteryAppContextProvider>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0b0e38] min-h-screen`}
      >
        <Header/>
        <main>{children}</main>
        {/* <Footer/> */}
      </body>
    </LotteryAppContextProvider>

      </ThirdwebProvider>
    </html>
  );
}
