// app/api/auth/check-username/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.redirect(new URL('/log-in', req.url));
    }

    // Verifică dacă user-ul are username
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { username: true }
    });

    if (!user?.username) {
      // Redirect la add-username dacă nu are
      return NextResponse.redirect(new URL('/add-username', req.url));
    }

    // Redirect la home dacă are
    return NextResponse.redirect(new URL('/', req.url));

  } catch (error) {
    console.error("Check username error:", error);
    return NextResponse.redirect(new URL('/log-in', req.url));
  }
}