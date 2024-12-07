"use client";

import { getProducts } from "@/lib/server/services/products";
import { useLocationContext } from "@/store";
import { ProductFilter } from "@/types/product";
import { readQuery, updateQuery } from "@/utils/filter";
import { SearchIcon, SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { CategoriesSelect, CurrencySelect } from "./common";
import { Button, Card, CardContent, Input, Label } from "./ui";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { dispatch } = useLocationContext();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<ProductFilter>(
    readQuery(searchParams)
  );
  const [priceError, setPriceError] = useState(false);

  useEffect(() => {
    getProducts(filters)
      .then((data) => {
        dispatch({
          type: "SET_LOCATIONS",
          payload: data.filter((d) => !!d.lat && !!d.lng),
        });
      })
      .catch((error) => console.error(error));

    // getChismes(filters).then((data) => {
    //   console.log(data);
    // });
  }, [searchParams]);

  useEffect(() => {
    const hasError =
      filters.priceMin &&
      filters.priceMax &&
      Number(filters.priceMin) > Number(filters.priceMax);

    setPriceError(Boolean(hasError));
  }, [filters]);

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const onSelect = (field: keyof ProductFilter) => (value: string) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    updateQuery(filters, router);
    setShowFilters(false);
  };

  return (
    <div className="space-y-2">
      <Card className="w-full bg-background/95 shadow-lg">
        <CardContent className="p-2">
          <div className="flex items-center space-x-2">
            <SearchIcon className="ml-1" />
            <Input
              placeholder="Buscar..."
              name="name"
              value={filters.name}
              onChange={onInput}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
            />
            <Button onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal />
            </Button>
          </div>
        </CardContent>
      </Card>

      {showFilters && (
        <Card>
          <CardContent className="mt-2">
            <div className="space-y-2">
              <CategoriesSelect
                name="categoryId"
                value={filters.categoryId}
                onValueChange={onSelect("categoryId")}
              />

              <div className="space-y-2">
                <Label>Precio</Label>
                <div className="flex gap-2">
                  <Input
                    className={
                      priceError ? "border-red-400 bg-red-100 text-red-400" : ""
                    }
                    name="priceMin"
                    value={filters.priceMin}
                    onChange={onInput}
                    type="number"
                    min="0"
                    placeholder="Mín"
                  />
                  <Input
                    name="priceMax"
                    value={filters.priceMax}
                    onChange={onInput}
                    type="number"
                    min="0"
                    placeholder="Máx"
                  />
                  <CurrencySelect disabled />
                </div>
              </div>

              <div className="pt-4">
                <Button
                  className="w-full px-4"
                  onClick={handleSearch}
                  disabled={priceError}
                >
                  <SearchIcon className="mr-2 h-4 w-4" />
                  Aplicar Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
