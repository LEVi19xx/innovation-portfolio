import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import CircuitTrace from "@/components/CircuitTrace";
import CustomCursor from "@/components/CustomCursor";
import TimeAmbience from "@/components/TimeAmbience";
import Welcome from "@/components/Welcome";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digital Innovation | Telex",
  description:
    "The Digital Innovation team at Telex — web developers and innovation associates turning bold ideas into working technology, from first prototype to full-scale launch.",
};

const themeInitScript = `(function(){try{var stored=localStorage.getItem("theme");var theme=stored==="light"||stored==="dark"?stored:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme",theme)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} h-full overflow-hidden antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        <TimeAmbience />
        <CircuitTrace />
        <Welcome />
        {children}
      </body>
    </html>
  );
}
