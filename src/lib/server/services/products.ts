"use server";

import { db } from "@/lib/db";
import { GetProductDto, ProductFilter } from "@/types/product";
import {
  and,
  eq,
  getTableColumns,
  gte,
  ilike,
  lte,
  sql,
  SQL
} from "drizzle-orm";
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
    console.log(_filters)
    return (await db
      .select({
        id: StoreTable.id,
        name: StoreTable.name,
        contact_information: StoreTable.contact_information,
        opening_hours: StoreTable.opening_hours,
        lat: StoreTable.lat,
        lng: StoreTable.lng,
        products: sql`COALESCE(json_agg(
        json_build_object(
            'id', ${ProductTable.id},
            'name', ${ProductTable.name},
            'description', ${ProductTable.description},
            'price', ${ProductInventoryTable.price},
            'image', ${ProductTable.image}
        )
    ) FILTER (WHERE ${ProductTable.id} IS NOT NULL), '[]')`,
      })
      .from(StoreTable)
      .leftJoin(
        ProductInventoryTable,
        eq(StoreTable.id, ProductInventoryTable.storeId)
      )
      .leftJoin(ProductTable, eq(ProductInventoryTable.productId, ProductTable.id))
      .where(and(..._filters))
      .groupBy(StoreTable.id)) as GetProductDto[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getProductsByStore = async (storeId: number) => {
  const productColumns = getTableColumns(ProductTable);
  try {
    return await db
      .select({ ...productColumns, quantity: ProductInventoryTable.quantity })
      .from(ProductInventoryTable)
      .leftJoin(
        ProductTable,
        eq(ProductInventoryTable.productId, ProductTable.id)
      )
      .where(eq(ProductInventoryTable.storeId, storeId));
  } catch (error) {
    console.log(error);
    return [];
  }
};
