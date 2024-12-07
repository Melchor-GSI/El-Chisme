"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { CategoriesSelect, CurrencySelect } from "./common";
import { CardContent, Input, Label } from "./ui";

// Define the schema using zod
const productSchema = z.object({
  name: z.string().nonempty("Nombre es requerido"),
  description: z.string().nonempty("Descripcion es requerida"),
  price: z.number().min(0, "Precio debe ser mayor o igual a 0"),
  categoryId: z.string().nonempty("Categoria es requerida"),
});

type ProductFormValues = z.infer<typeof productSchema>;

export type ProductFormProps = {
  onSubmit: (data: ProductFormValues) => void;
};

export const ProductForm = ({ onSubmit }: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  return (
    <form id="product" onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-2">
        <div className="space-y-1.5">
          <Label className="pl-1">Nombre</Label>
          <Input {...register("name")} placeholder="Inserte nombre" />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <CategoriesSelect onValueChange={field.onChange} />
          )}
        />
        {errors.categoryId && <span>{errors.categoryId.message}</span>}

        <div className="space-y-1.5">
          <Label className="pl-1">Precio</Label>
          <div className="flex gap-2">
            <div>
              <Input
                {...register("price", { valueAsNumber: true })}
                type="number"
                min="0"
                placeholder="Inserte Precio"
              />
              {errors.price && <span>{errors.price.message}</span>}
            </div>
            <CurrencySelect />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="ml-1">Descripcion</Label>
          <Input
            {...register("description")}
            placeholder="Inserte descripcion"
          />
          {errors.description && <span>{errors.description.message}</span>}
        </div>
      </CardContent>
    </form>
  );
};
