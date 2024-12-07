import { ProductTable } from '@/components/products/productTable/productTable'

export function ProductManager() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-semibold text-gray-900">Inventario de Productos</h2>
      </div>
      <ProductTable />
    </div>
  )
}

