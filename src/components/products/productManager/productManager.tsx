'use client'

import { useState } from 'react'
import { ProductTable } from '@/components/products/productTable/productTable'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ProductForm, ProductFormValues } from '@/components/products/productForm/product-form'
import { toast } from "sonner"

export function ProductManager() {
    const [open, setOpen] = useState(false)

    const handleSubmit = async (data: ProductFormValues) => {
      try {
        // Aquí irá tu lógica para guardar el producto
        console.log('Producto a guardar:', data)
        toast.success('Producto agregado exitosamente')
        setOpen(false)
      } catch {
        toast.error('Error al agregar el producto')
      }
    }

    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
          <h2 className="text-2xl font-semibold text-gray-900">Inventario de Productos</h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Añadir producto</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Producto</DialogTitle>
              </DialogHeader>
              <ProductForm onSubmit={handleSubmit} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="overflow-x-auto">
          <ProductTable />
        </div>
      </div>
    )
}

