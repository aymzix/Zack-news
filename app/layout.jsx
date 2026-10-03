import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ZACK NEWS",
    template: "%s | ZACK NEWS",
  },
  description:
    "ZACK NEWS — منصة إخبارية حديثة تجمع الأخبار وتقدمها بشكل سريع وموثوق.",
  keywords: [
    "ZACK NEWS",
    "أخبار",
    "المغرب",
    "العالم",
    "رياضة",
    "تكنولوجيا",
    "اقتصاد",
  ],
  authors: [{ name: "ZACK NEWS" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "ZACK NEWS",
    description:
      "آخر الأخبار من المغرب والعالم في مكان واحد.",
    type: "website",
    locale: "ar_MA",
    siteName: "ZACK NEWS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
      </body>
    </html>
  );
    }
