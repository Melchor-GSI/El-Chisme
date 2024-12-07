import { db } from "@/lib/db";
import { ProductTable } from "@/lib/server/db/schemas";
import { ProductInventoryTable } from "@/lib/server/db/schemas/product_inventory";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    
    console.log('ID a actualizar:', id);
    console.log('Datos recibidos:', body);

    // Actualizar producto
    const updatedProduct = await db
      .update(ProductTable)
      .set({
        name: body.name,
        description: body.description,
        categoryId: body.categoryId,
      })
      .where(eq(ProductTable.id, id))
      .returning();

    // Actualizar precio en inventario
    const updatedInventory = await db
      .update(ProductInventoryTable)
      .set({
        price: body.price,
      })
      .where(eq(ProductInventoryTable.productId, id))
      .returning();

    console.log('Producto actualizado:', updatedProduct);
    console.log('Inventario actualizado:', updatedInventory);

    return NextResponse.json({ 
      message: "Producto actualizado",
      product: updatedProduct[0],
      inventory: updatedInventory[0]
    });
  } catch (error) {
    console.error('Error en actualización:', error);
    return NextResponse.json(
      { error: "Error al actualizar el producto" },
      { status: 500 }
    );
  }
} 