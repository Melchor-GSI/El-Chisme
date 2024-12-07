'use client'

import { useState } from 'react'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Product } from '@/lib/server/services/productServices'
import { useProducts } from '@/hooks/useProduct'

export function ProductTable() {
    const { products, isLoading, error, deleteProduct } = useProducts()
    const [productToDelete, setProductToDelete] = useState<Product | null>(null)
  
    if (isLoading) return <div>Cargando productos...</div>
    if (error) return <div>Error: {error}</div>
  
    const handleDeleteClick = (product: Product) => {
      setProductToDelete(product)
    }
  
    const handleDeleteConfirm = async () => {
      if (productToDelete) {
        await deleteProduct(productToDelete.id, productToDelete.name)
        setProductToDelete(null)
      }
    }
  
    const handleDeleteCancel = () => {
      setProductToDelete(null)
    }
  
    return (
      <div className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Nombre</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead className="hidden sm:table-cell">Categoría</TableHead>
              <TableHead className="w-[70px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell className="hidden sm:table-cell">{product.category}</TableCell>
                <TableCell>
                  <ProductActions product={product} onDeleteClick={handleDeleteClick} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
  
        <DeleteConfirmationDialog
          product={productToDelete}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      </div>
    )
  }
  
  function ProductActions({ product, onDeleteClick }: { product: Product, onDeleteClick: (product: Product) => void }) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menú</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => console.log('Editar', product)}>
            <Pencil className="mr-2 h-4 w-4" />
            <span>Editar</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => onDeleteClick(product)}
            className="text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Eliminar</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  
  function DeleteConfirmationDialog({ product, onConfirm, onCancel }: {
    product: Product | null,
    onConfirm: () => void,
    onCancel: () => void
  }) {
    if (!product) return null
  
    return (
      <AlertDialog open={true} onOpenChange={onCancel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente el producto
              <strong> {product.name}</strong> y eliminará sus datos de nuestros servidores.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onCancel}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  
  