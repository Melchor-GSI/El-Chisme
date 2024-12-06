import { db } from "@/lib/db";
import { categoriesTable } from "../db/schemas/category";

export const getCategories = async () => {
  try {
    return await db.select().from(categoriesTable);
  } catch (error) {
    console.log(error);
    return [];
  }
};
