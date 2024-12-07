'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ProductForm, ProductFormValues } from "@/components/products/productForm/product-form"
import { useProducts } from "@/hooks/useProduct"
import { toast } from "sonner"

export function ProductDialog() {
  const { loadProducts } = useProducts()

  const handleSubmit = async (data: ProductFormValues) => {
    try {
      // Aquí irá la llamada a tu API para guardar el producto
      await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      toast.success('Producto agregado exitosamente')
      await loadProducts() // Recarga la tabla con los productos actualizados
    } catch  {
      toast.error('Error al agregar el producto')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Agregar Producto</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Producto</DialogTitle>
        </DialogHeader>
        <ProductForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}