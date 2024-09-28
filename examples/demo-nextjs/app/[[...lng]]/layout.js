import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CenterBox from "@/components/center-box";
import { dir } from 'i18next'
import { fallbackLng, languages } from "@/i18n/settings";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng: [lng.toLowerCase()] })).concat({ lng: null });
}

export const metadata = {
  title: "navbar-153 demo",
  description: "Animated, accessible, customizable navigation menu component.",
};

export default function RootLayout({ children, params: { lng = [fallbackLng] } }) {
  const targetLng = languages.includes(lng[0]) ? lng[0] : fallbackLng;
  const lowerCaseLng = targetLng.toLowerCase();
  return (
    <html lang={targetLng} dir={dir(targetLng)}>
      <body className={inter.className}>
        {lowerCaseLng === "en" ?
          <Link href="/zh-cn" className="lang_switch" lang="zh-CN">简体中文</Link> :
          <Link href="/en" className="lang_switch" lang="en">English</Link>}
        <Header lng={lng} />
        <CenterBox>
          {children}
          <Footer />
        </CenterBox>
      </body>
    </html>
  );
}
