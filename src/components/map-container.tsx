"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const Map = dynamic(() => import("@/components/map"), { ssr: false });

const MapContainer = () => {
  return (
    <Suspense>
      <Map />
    </Suspense>
  );
};

export default MapContainer;
