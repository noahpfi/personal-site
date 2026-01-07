import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Noah Pfister.',
  description: "Personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // sync pwa theme color with rest of the site before load and on theme change
  const themeScript = `
    (function() {
      function updateThemeColor() {
        // from globals.css
        const darkThemeColor = '#0a0a0a';
        const lightThemeColor = '#ffffff';
        
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          metaThemeColor.setAttribute('content', darkThemeColor);
        } else {
          metaThemeColor.setAttribute('content', lightThemeColor);
        }
      }
      // set initial
      updateThemeColor();
      // theme change listener
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateThemeColor);
    })();
  `;
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#dddddd" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="NP" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body
        className={`${inter.className} antialiased bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
