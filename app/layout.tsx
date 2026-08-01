import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "오늘의 운세",
  description: "카드를 눌러 오늘의 운세와 행운의 아이템을 확인해보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <footer className="py-6 text-center text-xs text-zinc-400 dark:text-zinc-500">
          <Link href="/privacy" className="underline hover:text-zinc-600 dark:hover:text-zinc-300">
            개인정보처리방침
          </Link>
        </footer>
      </body>
    </html>
  );
}
