import { FabButton } from "@/components/fab";
import MapContainer from "@/components/map-container";
import Search from "@/components/search";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <MapContainer />
      <div className="relative w-full p-4">
        <Suspense>
          <Search />
        </Suspense>
      </div>

      <FabButton />
    </>
  );
}
