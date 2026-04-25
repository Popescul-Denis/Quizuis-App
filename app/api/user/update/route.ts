import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@lib/auth";
import { db } from "@/lib/prisma";

export async function PATCH(req : NextRequest) {
  try{
    const session = await getServerSession(authOptions);

    if(!session?.user?.email){
      return NextResponse.json({error: "Neautorizat"},{status: 401});
    }

    const body = await req.json();
    const {username} = body;

    if(!username || typeof username !== 'string'){
      return NextResponse.json({error: "Username invalid"},{status: 400});
    }

    const existingUser = await db.user.findUnique({
      where: {username : username},
    });

    if(existingUser){
      return NextResponse.json({error: "Username-ul este deja folosit"},{status: 409});
    }

    const updatedUser = await db.user.update({
      where: {email: session.user.email},
      data: {username : username},
    })

    return NextResponse.json({message: "Username actualizat cu succes", user: {
      id: updatedUser.id,
      email: updatedUser.email,
      username: updatedUser.username,
    }}, {status: 200});

  } catch(error : unknown){
    const message = error instanceof Error ? error.message : 'Eroare necunoscuta';
    return NextResponse.json({error: message}, {status: 500});
  }
}
