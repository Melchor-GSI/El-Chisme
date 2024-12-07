"use client";

import { Product } from "@/types/product";
import { formatToCurrency } from "@/utils/format";
import { MapPin } from "lucide-react";
import { Marker, Popup } from "react-leaflet";
import { CategoryLabel } from "../common/category-label";
import { Data } from "../data";

export type LocationMarkerProps = {
  store: string;
  product: Product;
  location: [number, number];
};

export const LocationMarker = ({
  store,
  product,
  location,
}: LocationMarkerProps) => {
  return (
    <Marker position={location}>
      <MapPin />
      <Popup>
        <div className="p-2">
          <h3 className="font-bold">{store}</h3>

          <div className="">
            <Data title="Nombre" value={product.name} />

            <Data title="Precio" value={formatToCurrency(product.price)} />
            <Data
              title="Categoria"
              value={<CategoryLabel value={product.categoryId} />}
            />
          </div>
        </div>
      </Popup>
    </Marker>
  );
};
