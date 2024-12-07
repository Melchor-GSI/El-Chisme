"use client";

import { MapProps } from "@/components/map";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export const MapCaller = (props: MapProps) => {
  return <Map {...props} />;
};
