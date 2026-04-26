import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";

export async function GET(req : NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try{

    const { id } = await params;
    if(!id){
      return NextResponse.json({error: "Username lipsa"}, {status: 400});
    }
    const user = await db.user.findUnique({
      where: {id},
      select: { 
        id: true,
        email: true,
        username: true,
      }
    });

    if(!user){
      return NextResponse.json({error: "Utilizatorul nu a fost gasit"},{status: 404});
    }

    return NextResponse.json({user}, {status: 200});
  } catch(error : unknown){
    const message = error instanceof Error ? error.message : 'Eroare necunoscuta';
    return NextResponse.json({error: message}, {status: 500});
  } 
}