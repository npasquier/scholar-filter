import prisma from "../../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: {params: {token: string}}) {
  try {
    const token = params.token;

    if (typeof token !== "string") {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    // Find the verification token in the database
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        token: token,
      },
    });

    // Check if token is valid
    if (!verificationToken || verificationToken.expires < new Date()) {
      return NextResponse.json(
        { message: "Token is invalid or has expired" },
        { status: 400 }
      );
    }

    // Update the user's email verification status
    await prisma.user.update({
      where: { email: verificationToken.identifier },
      data: { emailVerified: new Date() },
    });

    // Delete the token from the database
    await prisma.verificationToken.delete({
      where: {
        token: token,
      },
    });

    // Send a success response -- should change to a redirect to the app

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
