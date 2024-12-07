"use client";

import { useLocationContext } from "@/store";
import { ChevronLeft } from "lucide-react";
import { ProductItem } from "./ProductItem";
import { Button, Card } from "./ui";

export const ProductList = () => {
  const { state, dispatch } = useLocationContext();
  const location = state.selectedLocation;

  const onClose = () => {
    dispatch({ type: "SET_SELECTED_LOCATION", payload: null });
  };

  if (!location) {
    return null;
  }

  return (
    <Card>
      <div className="p-4 pb-2 flex gap-2 items-center">
        <Button
          className="h-4 w-4 rounded-full p-4"
          variant="ghost"
          onClick={onClose}
        >
          <ChevronLeft />
        </Button>
        <h2 className="font-bold text-lg">{location.name}</h2>
      </div>

      <div className="overflow-auto max-h-[800px]">
        {location.products.map((product, index) => (
          <ProductItem
            key={index}
            name={product.name}
            price={product.price}
            // imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </Card>
  );
};
