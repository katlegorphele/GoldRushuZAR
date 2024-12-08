import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThirdwebProvider } from "thirdweb/react";
require('dotenv').config()
import { client } from "./client";

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

export const metadata = {
  title: "Lottery - A.A Demo",
  description: "Account Abstraction Demo",
};



export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      <ThirdwebProvider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white min-h-screen`}
      >
        <Header/>
        <main>{children}</main>
        <Footer/>
      </body>
      </ThirdwebProvider>
    </html>
  );
}
