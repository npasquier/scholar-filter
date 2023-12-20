import { NextRequest, NextResponse } from "next/server";
import schema from "../../../lib/schema";
import prisma from "../../../prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Resend } from 'resend';
import WelcomeTemplate from "@/emails/WelcomeTemplate";


const resend = new Resend(process.env.RESEND_API_KEY!);


export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (user) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  const hashedpassword = await bcrypt.hash(body.password, 10);

  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      hashpassword: hashedpassword,
    },
  });

  const generatedToken = crypto.randomBytes(32).toString('hex'); // Generate a secure random token
  const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

  await prisma.verificationToken.create({
    data: {
      identifier: newUser.email!,
      token: generatedToken,
      expires: tokenExpiry,
    },
  });

  const verificationLink = `${process.env.SERVER_URL}/api/register/verify-email/${generatedToken}`;
  
  try {
    await resend.emails.send({
      from: 'scholar-filter@npasquier.dev',
      to: newUser.email!,
      subject: 'Verify your email address',
      react: WelcomeTemplate({ email: newUser.email!, verificationUrl: verificationLink }),
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
  }

  return NextResponse.json(
    { message: "New user is added successfully with email: " + newUser.email + ". Waiting for verification email..." },
    { status: 200 }
  );
}
