"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToggleState } from "@/hooks/useToggleState";
import { useLocationContext } from "@/store";
import { Location } from "@/types/types";
import { SearchIcon, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Filters } from "./filters";

export default function Search() {
  const searchParams = useSearchParams();
  const { dispatch } = useLocationContext();
  const [productName, setProductName] = useState("");
  const [showFilters, toggleShowFilters] = useToggleState();

  useEffect(() => {
    fetch(`/products?${searchParams.toString()}`)
      .then((response) => response.json())
      .then(({ data }: { data: Location[] }) => {
        dispatch({
          type: "SET_LOCATIONS",
          payload: data.filter((d) => d.store !== null),
        });
        console.log(data);
      })
      .catch((error) => console.error(error));
    // .then((data) => console.log(data));
  }, [searchParams]);

  // useEffect(() => {

  // }, []);

  return (
    <div className="space-y-2">
      <Card className="w-full bg-background/95 shadow-lg">
        <CardContent className="p-2 flex items-center space-x-2">
          <SearchIcon className="ml-1" />
          <Input
            placeholder="Buscar..."
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <Button onClick={toggleShowFilters}>
            <SlidersHorizontal />
          </Button>
        </CardContent>
      </Card>

      {showFilters && <Filters />}
    </div>
  );
}
