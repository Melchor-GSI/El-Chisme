"use server";

import { db } from "@/lib/db";
import { ProductFilter } from "@/types/product";
import { and, eq, getTableColumns, gte, ilike, lte, SQL } from "drizzle-orm";
import { ProductTable } from "../db/schemas";
import { ChismeTable } from "../db/schemas/chisme";
import { LocationTable } from "../db/schemas/location";
import { CreateChismeDTO } from "@/types/chisme";

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

export const createChisme = async (chisme: CreateChismeDTO) => {
  try {
    let location = null;
    if (chisme.lat && chisme.lng) {
      location = await db
        .insert(LocationTable)
        .values({ lat: chisme.lat, lng: chisme.lng })
        .returning({ id: LocationTable.id });
    }
    return await db.insert(ChismeTable).values({
      productId: chisme.productId,
      price: chisme.price,
      ...(location ? { location: location[0].id } : {}),
      storeId: chisme.storeId,
      // add 3 days to the current date
      end_date: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
    });
  } catch (err) {
    console.log(err);
    return null;
  }
};
