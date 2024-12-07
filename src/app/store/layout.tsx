import { Notification } from '@/components/notification'
import { NotificationProvider } from '@/contexts/NotificationContext'

export default function StoreLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-auto">
        <NotificationProvider>
        <header className="border-b shadow-sm p-4">
          <h1 className="text-2xl font-bold text-gray-800">Tienda - Gestión de Productos</h1>
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
        <footer className="border-t p-4 text-center text-gray-600">
          <p>&copy; 2024 Mi Tienda. Todos los derechos reservados.</p>
          </footer>
          <Notification />
        </NotificationProvider>
      </div>
    )
  }