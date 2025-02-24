import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DM_Sans } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dm_sans = DM_Sans({ subsets: ['latin'] })
export const metadata = {
  title: "NoteTaKKer",
  description: "Note Taking App",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={dm_sans.className}
        >
          <Provider>
            {children}
          </Provider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
