import { Notification } from "@/components/notification";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <NotificationProvider>
        <html lang="en">
          <body>
            <main className="relative h-screen w-screen overflow-hidden">
              {children}
              <Notification />
            </main>
          </body>
        </html>
      </NotificationProvider>
    </ClerkProvider>
  );
}
