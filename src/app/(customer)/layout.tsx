import MapContainer from "@/components/map-container";
import { LocationProvider } from "@/store";
import React from "react";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LocationProvider>
      <MapContainer />
      {children}
    </LocationProvider>
  );
}
