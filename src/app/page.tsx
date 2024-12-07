import { FabButton } from "@/components/fab";
import MapContainer from "@/components/map-container";
import { ProductList } from "@/components/ProductList";
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

      <div className="absolute bottom-0 w-full max-h-[80%] z-20 overflow-hidden">
        <ProductList />
      </div>

      <FabButton />
    </>
  );
}
