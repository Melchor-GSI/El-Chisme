"use client";

import {
  ProductForm,
  ProductFormValues,
} from "@/components/products/productForm/product-form";
import { ProductTable } from "@/components/products/productTable/productTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Product } from "@/types/product";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface SelectedProduct extends ProductFormValues {
  id: number;
}

export function ProductManager() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<SelectedProduct | null>(null);
  const tableRef = useRef<{ loadProducts: () => Promise<void> }>(null);

  const handleSubmit = async (data: ProductFormValues) => {
    try {
      const productData = {
        storeId: 3,
        price: data.price || "0",
        quantity: 0,
        product: {
          name: data.name,
          description: data.description || null,
          categoryId: data.categoryId,
        },
      };

      console.log("Frontend - Datos a enviar:", productData);

      const response = await fetch("/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const result = await response.json();
      console.log("Frontend - Respuesta recibida:", result);

      if (!response.ok) {
        throw new Error(result.error || "Error al crear el producto");
      }

      toast.success("Producto agregado exitosamente");
      setOpen(false);

      if (tableRef.current) {
        await tableRef.current.loadProducts();
      }
    } catch (error) {
      console.error("Frontend - Error completo:", error);
      toast.error("Error al agregar el producto");
    }
  };

  const handleEdit = async (data: ProductFormValues) => {
    try {
      if (!selectedProduct?.id) return;

      const updatedProduct = {
        name: data.name,
        description: data.description || null,
        price: data.price || "0",
        categoryId: data.categoryId,
      };

      console.log("Enviando actualización:", updatedProduct);

      const response = await fetch(`/api/products/${selectedProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      const result = await response.json();
      console.log("Respuesta del servidor:", result);

      if (!response.ok) {
        throw new Error(result.error || "Error al actualizar");
      }

      toast.success("Producto actualizado exitosamente");
      setEditOpen(false);
      setSelectedProduct(null);

      // Recargar la tabla
      if (tableRef.current) {
        await tableRef.current.loadProducts();
      }
    } catch (error) {
      console.error("Error detallado:", error);
      toast.error("Error al actualizar el producto");
    }
  };

  const onEdit = (product: Product) => {
    const formValues: ProductFormValues = {
      name: product.name || "",
      description: product.description || "",
      price: product.price || 0,
      categoryId: product.categoryId ?? 0,
    };
    setSelectedProduct({ id: product.id, ...formValues });
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
            <DialogDescription>
              Modifica los detalles del producto seleccionado.
            </DialogDescription>
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
        <ProductTable ref={tableRef} storeId={3} onEdit={onEdit} />
      </div>
    </div>
  );
}
