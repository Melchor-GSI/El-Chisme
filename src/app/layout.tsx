import Map from "@/components/map";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <main className="relative h-screen w-screen overflow-hidden">
            <Map />

            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
