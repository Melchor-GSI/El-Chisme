import { db } from "@/lib/db";
import { Product } from "@/types/product";
import { SQL, and } from "drizzle-orm";
import { productsTable } from "../db/schemas";

export const getProducts = async (
  filters: SQL<unknown>[]
): Promise<Product[]> => {
  try {
    const query = db.select().from(productsTable);
    if (filters.length) query.where(and(...filters));
    return await query.execute();
  } catch (error) {
    console.error(error);
    return [];
  }
};
