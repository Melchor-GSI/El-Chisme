"use client";

import MapContainer from "@/components/map-container";
import { ProductForm } from "@/components/product-form";
import { ProductFormValues } from "@/components/products/productForm/product-form";
import { Button } from "@/components/ui";
import { BackButton } from "@/components/ui/back-button";
import { Card, CardFooter } from "@/components/ui/card";
import { useLocationContext } from "@/store";
import { useState } from "react";

export default function NewGossip() {
  const { state, dispatch } = useLocationContext();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<ProductFormValues>();

  const onFormSubmit = (data: ProductFormValues) => {
    console.log(data);
    setFormSubmitted(true);
    setFormData(data);
    dispatch({ type: "SET_LOCATING", payload: true });
  };

  const onLocationSubmit = () => {
    console.log({ ...formData, ...state.locatingCoords });
    // if (state.locatingCoords)
    //   console.log({
    //     ...formData,
    //     ...state.locatingCoords,
    //   });

    // createChisme()
  };

  return (
    <>
      <MapContainer />

      <div className="absolute top-4 left-4">
        <BackButton />
      </div>

      <div className="absolute bottom-0 w-full z-10">
        <Card className="py-4">
          {formSubmitted ? (
            <div className="px-4">
              <h2 className="font-bold text-lg">Ubicación</h2>
              <p>Seleccione la ubicación en el mapa</p>
              <Button className="w-full mt-4" onClick={onLocationSubmit}>
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
