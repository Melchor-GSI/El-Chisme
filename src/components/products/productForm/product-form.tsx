"use client";

import { CategoriesSelect, CurrencySelect } from "@/components/common";
import { Button, CardContent, Input, Label } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

// Define the schema using zod
const productSchema = z.object({
  name: z.string().nonempty("Nombre es requerido"),
  description: z.string().nonempty("Descripcion es requerida"),
  price: z.number().min(0, "Precio debe ser mayor o igual a 0"),
  categoryId: z.number().min(0, "Categoria es requerida"),
});

export type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  onSubmit: (data: ProductFormValues) => void;
  initialValues?: ProductFormValues;
}

export const ProductForm = ({ onSubmit, initialValues }: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialValues,
  });

  return (
    <CardContent className="space-y-2">
      <form
        id="product"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2"
      >
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
        <div className="pt-6">
          <DialogClose asChild>
            <Button type="submit" className="w-full">
              Añadir Producto
            </Button>
          </DialogClose>
        </div>
      </form>
    </CardContent>
  );
};
