import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try{
    // Verifică autentificarea
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Neautorizat" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { quizName } = body;

    // Găsește scorul utilizatorului pentru quiz-ul specific
    const user = await db.user.findUnique({
        where: { email: session.user.email },
        include: {
          results: {
            where: { quizName },
          },
        },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilizatorul nu a fost găsit" },
        { status: 404 }
      );
    }
    // Returneaza scorul cel mai mare pentru quiz-ul specific
    const highestScore = user.results.reduce((max : number, result : {
      score: number;
    }) => {
      return result.score > max ? result.score : max;
    }, 0);
    return NextResponse.json(
      { 
        quizName,
        highestScore 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user score:", error);
    return NextResponse.json(
      { error: "Eroare la preluarea scorului utilizatorului" },
      { status: 500 }
    );
  }
}