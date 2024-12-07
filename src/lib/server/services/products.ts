'use server'

import { db } from "@/lib/db";
import { GetProductDto, ProductFilter } from "@/types/product";
import { and, eq, gte, ilike, lte, SQL } from "drizzle-orm";
import { ProductTable } from "../db/schemas";
import { ProductInventoryTable } from "../db/schemas/product_inventory";
import { StoreTable } from "../db/schemas/store";

export const getProducts = async (
  filters?: ProductFilter
): Promise<GetProductDto[]> => {
  try {
    const _filters: SQL[] = [];
    if (filters?.name) {
      _filters.push(ilike(ProductTable.name, `%${filters.name}%`));
      _filters.push(ilike(ProductTable.description, `%${filters.name}%`));
    }
    if (filters?.categoryId)
      _filters.push(eq(ProductTable.categoryId, Number(filters.categoryId)));

    if (filters?.priceMax)
      _filters.push(lte(ProductInventoryTable.price, Number(filters.priceMax)));

    if (filters?.priceMin)
      _filters.push(gte(ProductInventoryTable.price, Number(filters.priceMin)));

    return await db
      .select({
        id: ProductTable.id,
        name: ProductTable.name,
        description: ProductTable.description,
        price: ProductInventoryTable.price,
        image: ProductTable.image,
        store: {
          id: StoreTable.id,
          name: StoreTable.name,
          contact_information: StoreTable.contact_information,
          opening_hours: StoreTable.opening_hours,
          lat: StoreTable.lat,
          long: StoreTable.long,
        },
      })
      .from(ProductTable)
      .leftJoin(
        ProductInventoryTable,
        eq(ProductTable.id, ProductInventoryTable.product_id)
      )
      .leftJoin(StoreTable, eq(ProductInventoryTable.store_id, StoreTable.id))
      .where(and(..._filters));
  } catch (error) {
    console.error(error);
    return [];
  }
};
