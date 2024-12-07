import { useMapCenter } from "@/hooks/useMapCenter";
import L from "leaflet";
import { useEffect, useRef } from "react";
import { Marker, useMap } from "react-leaflet";

export function CenteredMarker() {
  const map = useMap();
  const center = useMapCenter();
  const markerRef = useRef<L.Marker>(null);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLatLng(center);
    }
  }, [center, map]);

  return <Marker ref={markerRef} position={center} />;
}
