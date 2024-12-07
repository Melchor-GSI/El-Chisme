'use server'

import { db } from "@/lib/db";
import { CreateProductDto } from "@/types/product";
import { eq, getTableColumns } from "drizzle-orm";
import { ProductTable } from "../db/schemas";
import { ProductInventoryTable } from "../db/schemas/product_inventory";

export const getInventories = async (storeId: number) => {
  const productColumns = getTableColumns(ProductTable);
  try {
    return await db
      .select({ ...productColumns, quantity: ProductInventoryTable.quantity })
      .from(ProductInventoryTable)
      .leftJoin(
        ProductTable,
        eq(ProductInventoryTable.product_id, ProductTable.id)
      )
      .where(eq(ProductInventoryTable.store_id, storeId));
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createProductInventory = async (
  data: CreateProductDto,
  storeId: number
) => {
  try {
    // const category = await db
    //   .select()
    //   .from(CategoriesTable)
    //   .where(eq(CategoriesTable.id, data.categoryId));
    // if (category.length === 0) {
    //   throw new Error("Category not found");
    // }
    const { quantity, price, categoryId, ...rest } = data;

    // insert product
    const product = await db
      .insert(ProductTable)
      .values({
        ...rest,
        categoryId: categoryId,
      })
      .returning({ id: ProductTable.id });

    if (!product) {
      throw new Error("Error inserting product");
    }

    await db.insert(ProductInventoryTable).values({
      product_id: product[0].id,
      store_id: storeId,
      quantity: quantity,
      price: price,
    });

    return product;
  } catch (error) {
    console.log(error);
  }
};




