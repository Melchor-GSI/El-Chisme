import { db } from "@/lib/db";
import { GetProductDto, ProductFilter } from "@/types/product";
import { and, eq, gte, ilike, SQL } from "drizzle-orm";
import { ProductTable } from "../db/schemas";
import { ProductInventoryTable } from "../db/schemas/product_inventory";
import { StoreTable } from "../db/schemas/store";

export const getProducts = async (
  filters: ProductFilter
): Promise<GetProductDto[]> => {
  try {
    const _filters: SQL[] = [];
    if (filters.name) {
      _filters.push(ilike(ProductTable.name, `%${filters.name}%`));
      _filters.push(ilike(ProductTable.description, `%${filters.name}%`));
    }
    if (filters.categoryId)
      _filters.push(eq(ProductTable.categoryId, Number(filters.categoryId)));
    if (filters.priceMin)
      _filters.push(gte(ProductTable.price, Number(filters.priceMin)));
    if (filters.priceMax)
      _filters.push(gte(ProductTable.price, Number(filters.priceMax)));

    return await db
      .select({
        name: ProductTable.name,
        description: ProductTable.description,
        price: ProductTable.price,
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
