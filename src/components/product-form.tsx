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

export const ProductForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = (data: ProductFormValues) => {
    console.log(data);
  };

  return (
    <CardContent className="space-y-2">
      <form id="product" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label>Nombre</Label>
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

        <div className="space-y-2">
          <Label>Precio</Label>
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

        <div className="space-y-2">
          <Label>Descripcion</Label>
          <Input
            {...register("description")}
            placeholder="Inserte descripcion"
          />
          {errors.description && <span>{errors.description.message}</span>}
        </div>
      </form>
    </CardContent>
  );
};
