"use client";

import { useState } from "react";
import { ProductTable } from "@/components/products/productTable/productTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ProductForm,
  ProductFormValues,
} from "@/components/products/productForm/product-form";
import { toast } from "sonner";
import { Product } from "@/lib/server/services/productServices";

export function ProductManager() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductFormValues | null>(null);

  const handleSubmit = async (data: ProductFormValues) => {
    try {
      // Aquí irá tu lógica para guardar el producto
      console.log("Producto a guardar:", data);
      toast.success("Producto agregado exitosamente");
      setOpen(false);
    } catch {
      toast.error("Error al agregar el producto");
    }
  };

  const handleEdit = async (data: ProductFormValues) => {
    try {
      console.log("Producto a editar:", data);
      toast.success("Producto actualizado exitosamente");
      setEditOpen(false);
      setSelectedProduct(null);
    } catch {
      toast.error("Error al actualizar el producto");
    }
  };

  const onEdit = (product: Product) => {
    const formValues: ProductFormValues = {
      name: product.name,
      description: product.description || "",
      price: product.price || null,
      categoryId: product.category?.toString() || "",
    };
    setSelectedProduct(formValues);
    setEditOpen(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-semibold text-gray-900">
          Inventario de Productos
        </h2>
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
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Producto</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <ProductForm
              onSubmit={handleEdit}
              initialValues={selectedProduct}
            />
          )}
        </DialogContent>
      </Dialog>

      <div className="overflow-x-auto">
        <ProductTable onEdit={onEdit} />
      </div>
    </div>
  );
}
