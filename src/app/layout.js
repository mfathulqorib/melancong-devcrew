import { Inter as FontSans } from "next/font/google";
import { Provider } from "@/components/providers";

import "@/styles/globals.css";

const fontSans = FontSans({ subsets: ["latin"] });

export const metadata = {
  title: "Melancong",
  description: "Share your wonderful journey",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="icon" href="/logo_melancong.ico" />
      </head>
      <body className={`${fontSans.className} scroll-smooth`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
