"use client";

import { ProductFilter } from "@/types/product";
import { readQuery, updateQuery } from "@/utils/filter";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { CategoriesSelect, CurrencySelect } from "./common";
import { Button, Card, CardContent, CardFooter, Input, Label } from "./ui";

export const Filters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<ProductFilter>(
    readQuery(searchParams)
  );
  const [priceError, setPriceError] = useState(false);

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
  };

  return (
    <Card className="py-4">
      <CardContent className="space-y-2">
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
            />
            <Input
              name="priceMax"
              value={filters.priceMax}
              onChange={onInput}
              type="number"
              min="0"
            />
            <CurrencySelect disabled />
          </div>
        </div>
      </CardContent>

      <CardFooter className="pb-0">
        <Button
          className="w-full px-4"
          onClick={handleSearch}
          disabled={priceError}
        >
          <SearchIcon className="mr-2 h-4 w-4" />
          Buscar
        </Button>
      </CardFooter>
    </Card>
  );
};
