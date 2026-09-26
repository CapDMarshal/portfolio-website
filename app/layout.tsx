import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fardila Bintang Adinata (Marshal) — Creative Frontend & AI Engineer",
  description:
    "Portfolio of Fardila Bintang Adinata (Marshal) — Head of IT Division at UTY Software House, Mobile/Web Frontend Developer at Ruumi Digital Sdn Bhd. Specializing in Next.js 16, React 19, Motion, Lenis, and Applied AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-clip">
        <SmoothScrollProvider>
          <Navbar />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
