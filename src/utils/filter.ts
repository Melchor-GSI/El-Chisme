import { ProductFilter } from "@/types/product";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";

export const readQuery = (query: ReadonlyURLSearchParams) => ({
  name: query.get("name") ?? "",
  priceMin: query.get("priceMin") ?? "",
  priceMax: query.get("priceMax") ?? "",
  categoryId: query.get("categoryId") ?? "",
});

export function updateQuery(filters: ProductFilter, router: AppRouterInstance) {
  const params = new URLSearchParams();

  if (filters.name) params.set("name", filters.name);
  if (filters.priceMin) params.set("priceMin", filters.priceMin);
  if (filters.priceMax) params.set("priceMax", filters.priceMax);
  if (filters.categoryId) params.set("categoryId", String(filters.categoryId));

  router.push(`?${params.toString()}`);
}

export const toQueryString = (query: ReadonlyURLSearchParams) => {
  return new URLSearchParams(query.toString()).toString();
};
