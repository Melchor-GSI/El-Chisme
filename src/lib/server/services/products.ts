"use server";

import { db } from "@/lib/db";
import {
  CreateStoreProductDto,
  GetProductDto,
  ProductFilter,
} from "@/types/product";
import { and, eq, gte, ilike, lte, sql, SQL } from "drizzle-orm";
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
    console.log(_filters);
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
      .leftJoin(
        ProductTable,
        eq(ProductInventoryTable.productId, ProductTable.id)
      )
      .where(and(..._filters))
      .groupBy(StoreTable.id)) as GetProductDto[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getProductsByStore = async (storeId: number) => {
  try {
    return await db
      .select({
        id: ProductTable.id,
        name: ProductTable.name,
        description: ProductTable.description,
        image: ProductTable.image,
        price: ProductInventoryTable.price,
        quantity: ProductInventoryTable.quantity,
        categoryId: ProductTable.categoryId,
      })
      .from(ProductInventoryTable)
      .leftJoin(
        ProductTable,
        eq(ProductInventoryTable.productId, ProductTable.id)
      )
      .where(eq(ProductInventoryTable.storeId, storeId));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteProduct = async (productId: number, storeId: number) => {
  try {
    await db
      .delete(ProductInventoryTable)
      .where(
        and(
          eq(ProductInventoryTable.productId, productId),
          eq(ProductInventoryTable.storeId, storeId)
        )
      );

    console.log("Producto eliminado con éxito");
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    throw error;
  }
};

export const createStoreProduct = async ({
  storeId,
  price,
  quantity,
  product,
}: CreateStoreProductDto) => {
  try {
    const [newProduct] = await db
      .insert(ProductTable)
      .values(product)
      .returning({
        id: ProductTable.id,
      });

    await db.insert(ProductInventoryTable).values({
      storeId,
      price,
      quantity,
      productId: newProduct.id,
    });

    console.log("Producto creado con éxito");
    return { success: true, productId: newProduct.id };
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw error;
  }
};
