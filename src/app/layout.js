import { Google_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";

const googleSans = Google_Sans({
  subsets: ["latin"],
  variable: "--font-google-sans",
  adjustFontFallback: false,
});

export const metadata = {
  title: "Skinstric",
  description: "A.I skin analysis that creates a personalized skincare routine.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={googleSans.variable}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
