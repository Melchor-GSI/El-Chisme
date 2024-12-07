"use client";

import { ProductForm } from "@/components/product-form";
import { ProductFormValues } from "@/components/products/productForm/product-form";
import { Button, Card, CardFooter } from "@/components/ui";
import { BackButton } from "@/components/ui/back-button";
import { useNotification } from "@/contexts/NotificationContext";
import { createChisme } from "@/lib/server/services/chisme";
import { useLocationContext } from "@/store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewGossip() {
  const router = useRouter();
  const { state, dispatch } = useLocationContext();
  const { addNotification } = useNotification();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<ProductFormValues>();
  const [loading, setLoading] = useState(false);

  const onFormSubmit = (data: ProductFormValues) => {
    setFormSubmitted(true);
    setFormData(data);
    dispatch({ type: "SET_LOCATING", payload: true });
  };

  const onLocationSubmit = async () => {
    if (!formData || !state.locatingCoords) return;

    setLoading(true);
    createChisme({
      product: {
        categoryId: Number(formData.categoryId),
        description: formData.description,
        name: formData.name,
      },
      location: state.locatingCoords,
    })
      .then(() => {
        dispatch({ type: "SET_LOCATING_COORDS", payload: null });
        dispatch({ type: "SET_LOCATING", payload: false });
        addNotification("success", "Chisme creado correctamente!");
        router.push("/search");
      })
      .catch((err) => {
        console.error(err);
        addNotification(
          "error",
          "Hubo un error creando el chisme. Intente más tarde"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>

      <div className="absolute bottom-0 w-full z-10">
        <Card className="py-4">
          {formSubmitted ? (
            <div className="px-4">
              <h2 className="font-bold text-lg">Ubicación</h2>
              <p>Seleccione la ubicación en el mapa</p>
              <Button
                className="w-full mt-4"
                onClick={onLocationSubmit}
                loading={loading}
              >
                Confirmar
              </Button>
            </div>
          ) : (
            <>
              <ProductForm onSubmit={onFormSubmit} />
              <CardFooter className="pb-0">
                <Button className="w-full px-4" type="submit" form="product">
                  Continuar
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </>
  );
}
