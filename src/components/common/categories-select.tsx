"use client";

import { getCategories } from "@/lib/server/services/categories";
import { Category } from "@/types/product";
import { SelectProps } from "@radix-ui/react-select";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const CategoriesSelect = (props: SelectProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
    // fetch("/categories")
    //   .then((response) => response.json())
    //   .then((data) => setCategories(data.data));
  }, []);

  return (
    <div className="space-y-2">
      <Label htmlFor="category">Categoria</Label>

      <Select {...props}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Seleccionar categoria" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {categories.map((category) => (
              <SelectItem key={category.id} value={String(category.id)}>
                {category.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
