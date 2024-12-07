import { ProductTable } from "@/lib/server/db/schemas";
import { ProductFilter } from "@/types/product";
import { eq, gte, like, lte } from "drizzle-orm";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";

export const readQuery = (query: ReadonlyURLSearchParams) => ({
  name: query.get("name") ?? "",
  priceMin: query.get("priceMin") ?? "",
  priceMax: query.get("priceMax") ?? "",
  currency: query.get("currency") ?? "1",
  categoryId: query.get("categoryId") ?? "",
});

export function updateQuery(filters: ProductFilter, router: AppRouterInstance) {
  const params = new URLSearchParams();

  if (filters.name) params.set("name", filters.name);
  if (filters.priceMin) params.set("priceMin", filters.priceMin);
  if (filters.priceMax) params.set("priceMin", filters.priceMax);
  if (filters.currency) params.set("currency", String(filters.currency));
  if (filters.categoryId) params.set("categoryId", String(filters.categoryId));

  router.push(`?${params.toString()}`);
}

export const parseFilters = (
  searchParams: Record<string, string | string[] | undefined>
) => {
  const filters = [];
  if (searchParams.name) {
    filters.push(like(ProductTable.name, `%${searchParams.name}%`));
  }
  if (searchParams.minPrice) {
    filters.push(
      gte(ProductTable.price, parseInt(searchParams.minPrice as string))
    );
  }
  if (searchParams.maxPrice) {
    filters.push(
      lte(ProductTable.price, parseInt(searchParams.maxPrice as string))
    );
  }
  if (searchParams.categoryId) {
    filters.push(eq(ProductTable.categoryId, Number(searchParams.categoryId)));
  }

  return filters;
};

export const showFilters = () => {};
