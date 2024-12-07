import { db } from "@/lib/db";
import { ProductTable } from "@/lib/server/db/schemas";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();

    await db
      .update(ProductTable)
      .set({
        name: body.name,
        description: body.description,
        categoryId: body.categoryId,
      })
      .where(eq(ProductTable.id, id));

    return NextResponse.json({ message: "Producto actualizado" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al actualizar el producto" },
      { status: 500 }
    );
  }
}