'use client'

import { useState, useEffect } from 'react'
import { Product, productService } from '@/lib/server/services/productServices'
import { useNotification } from '@/app/contexts/NotificationContext'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addNotification } = useNotification()

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setIsLoading(true)
      const fetchedProducts = await productService.getProducts()
      setProducts(fetchedProducts)
      setError(null)
    } catch  {
      setError('Error al cargar los productos')
      addNotification('error', "No se pudieron cargar los productos")
    } finally {
      setIsLoading(false)
    }
  }

  const deleteProduct = async (id: number, productName: string) => {
    try {
      await productService.deleteProduct(id)
      setProducts(products.filter(p => p.id !== id))
      addNotification('success', `El producto "${productName}" ha sido eliminado exitosamente.`)
    } catch  {
      addNotification('error', "No se pudo eliminar el producto")
    }
  }

  return { products, isLoading, error, deleteProduct, loadProducts }
}

