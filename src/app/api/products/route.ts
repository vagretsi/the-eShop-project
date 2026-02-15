import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, price, description, category, image } = body;

    // Δημιουργία του προϊόντος στην Postgres
    const newProduct = await prisma.productsEshop.create({
      data: {
        title: title,
        price: parseFloat(price), // Μετατροπή σε αριθμό για σιγουριά
        description: description,
        category: category,
        image: image,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json({ error: "Error creating product" }, { status: 500 });
  }
}