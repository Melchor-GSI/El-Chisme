import { ReactNode } from "react";
import { MapCaller } from "./MapCaller";

export type MapContainerProps = {
  mapContent?: ReactNode;
  children: ReactNode;
};

export const MapContainer = ({ mapContent, children }: MapContainerProps) => {
  return (
    <div>
      <MapCaller>{mapContent}</MapCaller>

      {children}
    </div>
  );
};
