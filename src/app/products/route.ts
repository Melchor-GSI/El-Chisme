import { db } from "@/lib/db";
import { NextResponse } from "next/server";

import { ProductTable } from "@/lib/server/db/schemas/product";
import { getProducts } from "@/lib/server/services/products";
import { ProductFilter } from "@/types/product";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const filters: ProductFilter = {
      name: url.searchParams.get("name") as string,
      categoryId: url.searchParams.get("categoryId") as string,
      priceMin: url.searchParams.get("priceMin") as string,
      priceMax: url.searchParams.get("priceMax") as string,
    };

    const products = await getProducts(filters);
    return NextResponse.json({ data: products });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, categoryId, description } = await request.json();
    const newProduct = await db
      .insert(ProductTable)
      .values({ name, categoryId, description })
      .returning();
    return NextResponse.json({ data: newProduct });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
