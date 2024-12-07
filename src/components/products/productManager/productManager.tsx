'use client'

import { useState } from 'react'
import { Product } from '@/types/product'
import { ProductTable } from '@/components/products/productTable/productTable'
import { Button } from '@/components/ui/button'

export function ProductManager() {
    const [products, setProducts] = useState<Product[]>([
        { id: 1, name: 'Laptop', price: 999.99, categoryId: 1, createdAt: new Date()  },
        { id: 2, name: 'T-shirt', price: 19.99, categoryId: 2, createdAt: new Date() },
        { id: 3, name: 'Book', price: 9.99, categoryId: 3, createdAt: new Date() },
    ])

    const addProduct = () => {
        alert("Agregar producto")
    }
    const deleteProduct = (id: number) => {
        setProducts(products.filter(p => p.id !== id))
    }    
    const startEditing = () => {
        alert("Editar producto")
    }
    
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
            <h2 className="text-2xl font-semibold text-gray-900">Inventario de Productos</h2>
            <Button onClick={addProduct} className="w-full sm:w-auto">Agregar Producto</Button>
          </div>
          <div className="overflow-x-auto">
            <ProductTable 
              products={products} 
              onDelete={deleteProduct}
              onEdit={startEditing}
            />
          </div>
        </div>
    )
}