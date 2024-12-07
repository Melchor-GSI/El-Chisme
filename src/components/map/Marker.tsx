"use client";

import { Product } from "@/types/product";
import L from "leaflet";
import { MapPin } from "lucide-react";
import { createRoot } from "react-dom/client";
import { Marker, MarkerProps } from "react-leaflet";

export type LocationMarkerProps = {
  store: string;
  product: Product;
  location: [number, number];
};

export const createCustomIcon = () => {
  const iconHtml = document.createElement("div");
  const root = createRoot(iconHtml);
  root.render(<MapPin size={40} color="FAFAFA" />);

  return L.divIcon({
    html: iconHtml,
    className: "custom-marker",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
};

export const LocationMarker = (props: MarkerProps) => {
  return <Marker {...props} />;
};
