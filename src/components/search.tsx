"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToggleState } from "@/hooks/useToggleState";
import { Product } from "@/types/product";
import { SearchIcon, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Filters } from "./filters";

export type SearchProps = {
  products: Product[];
};

export default function Search({ products }: SearchProps) {
  const [productName, setProductName] = useState("");
  const [showFilters, toggleShowFilters] = useToggleState();
  console.log(products);

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
