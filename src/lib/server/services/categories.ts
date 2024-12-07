'use server'

import { db } from "@/lib/db";
import { CategoriesTable } from "../db/schemas/category";

export const getCategories = async () => {
  try {
    return await db.select().from(CategoriesTable);
  } catch (error) {
    console.log(error);
    return [];
  }
};
