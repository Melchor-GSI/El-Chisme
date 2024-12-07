"use server";

import { db } from "@/lib/db";
import { CreateChismeDto } from "@/types/chisme";
import { ProductFilter } from "@/types/product";
import { and, eq, getTableColumns, gte, ilike, lte, SQL } from "drizzle-orm";
import { ProductTable } from "../db/schemas";
import { ChismeTable } from "../db/schemas/chisme";
import { LocationTable } from "../db/schemas/location";

export const getChismes = async (filters?: ProductFilter) => {
  const productColumns = getTableColumns(ProductTable);
  const locationColumns = getTableColumns(LocationTable);
  try {
    const _filters: SQL[] = [];
    if (filters?.name) {
      _filters.push(ilike(ProductTable.name, `%${filters.name}%`));
      _filters.push(ilike(ProductTable.description, `%${filters.name}%`));
    }
    if (filters?.categoryId)
      _filters.push(eq(ProductTable.categoryId, Number(filters.categoryId)));

    if (filters?.priceMax)
      _filters.push(lte(ChismeTable.price, Number(filters.priceMax)));

    if (filters?.priceMin)
      _filters.push(gte(ChismeTable.price, Number(filters.priceMin)));

    return await db
      .select({
        id: ChismeTable.id,
        product: productColumns,
        location: locationColumns,
        created_date: ChismeTable.created_date,
        end_date: ChismeTable.end_date,
      })
      .from(ChismeTable)
      .leftJoin(ProductTable, eq(ChismeTable.productId, ProductTable.id))
      .leftJoin(LocationTable, eq(ChismeTable.location, LocationTable.id))
      .where(and(..._filters));
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const createChisme = async ({
  product,
  storeId,
  location,
}: CreateChismeDto) => {
  try {
    const [newProduct] = await db
      .insert(ProductTable)
      .values(product)
      .returning({
        id: ProductTable.id,
      });

    const [newLocation] = await db
      .insert(LocationTable)
      .values({ ...location })
      .returning({
        id: ProductTable.id,
      });

    const newChisme = await db
      .insert(ChismeTable)
      .values({
        productId: newProduct.id,
        storeId,
        location: newLocation.id,
      })
      .returning();
    return newChisme;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create chisme");
  }
};
