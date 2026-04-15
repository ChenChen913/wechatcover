import type { Metadata } from "next";
import {
  Noto_Sans_SC,
  Noto_Serif_SC,
  Ma_Shan_Zheng,
  Orbitron,
  Playfair_Display,
  ZCOOL_QingKe_HuangYou,
  ZCOOL_KuaiLe,
  Cinzel,
  Bebas_Neue,
  Source_Code_Pro,
} from "next/font/google";
import "./globals.css";

// 中文字体
const notoSans = Noto_Sans_SC({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const notoSerif = Noto_Serif_SC({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const maShanZheng = Ma_Shan_Zheng({
  variable: "--font-brush",
  subsets: ["latin"],
  weight: ["400"],
});

const zcoolQingKe = ZCOOL_QingKe_HuangYou({
  variable: "--font-zcool-qingke",
  subsets: ["latin"],
  weight: ["400"],
});

const zcoolKuaiLe = ZCOOL_KuaiLe({
  variable: "--font-zcool-kuaile",
  subsets: ["latin"],
  weight: ["400"],
});

// 英文字体
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "公众号封面生成工具",
  description: "微信公众号封面图生成工具 - 双封面合一，支持网页模式和提示词模式",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${notoSans.variable} ${notoSerif.variable} ${maShanZheng.variable} ${zcoolQingKe.variable} ${zcoolKuaiLe.variable} ${orbitron.variable} ${playfair.variable} ${cinzel.variable} ${bebas.variable} ${sourceCodePro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
