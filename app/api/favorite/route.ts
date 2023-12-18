import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";
import z from "zod";
import { getToken } from "next-auth/jwt";

const schemaPUT = z.object({
  email: z.string(),
  list: z.string(),
});

export async function PUT(request: NextRequest) {
  const body = await request.json();

  const validation = schemaPUT.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: validation.data.email },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      favorites: validation.data.list,
    },
  });

  return NextResponse.json(
    {
      message:
        "New favorite successfully added! Favorites are: " +
        updatedUser.favorites,
    },
    { status: 200 }
  );
}


export async function GET(req: NextRequest) {

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: token.email! },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 })
  }

  return NextResponse.json({ favorites: user.favorites }, { status: 200 })
  
}

