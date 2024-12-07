import { LocateFixed } from "lucide-react";
import React from "react";
import { useMap } from "react-leaflet";
import { Button } from "../ui";

const CenterButton: React.FC = () => {
  const map = useMap();

  const centerMapOnUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.setView([latitude, longitude], map.getZoom());
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <Button onClick={centerMapOnUserLocation}>
      <LocateFixed />
    </Button>
  );
};

export default CenterButton;
