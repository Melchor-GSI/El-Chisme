import Map from "@/components/map";
import { LocationProvider } from "@/store";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <LocationProvider>
        <html lang="en">
          <body>
            <main className="relative h-screen w-screen overflow-hidden">
              <Map />

              {children}
            </main>
          </body>
        </html>
      </LocationProvider>
    </ClerkProvider>
  );
}
