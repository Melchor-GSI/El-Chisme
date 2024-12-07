"use client";

import { getProductsByStore } from "@/lib/server/services/products";
import { SelectProps } from "@radix-ui/react-select";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductSelectProps extends SelectProps {
  storeId: number;
}

interface Product {
  id: number | null;
  name: string | null;
  description: string | null;
  image: string | null;
  price: number;
  quantity: number;
  categoryId: number | null;
}

export const ProductSelect = ({ storeId, ...props }: ProductSelectProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProductsByStore(storeId).then((data) => setProducts(data));
  }, [storeId]);

  return (
    <div className="space-y-2">
      <Label htmlFor="product">Producto</Label>

      <Select {...props}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Seleccionar producto" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {products.map((product) => (
              <SelectItem key={product.id} value={String(product.id)}>
                {product.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
