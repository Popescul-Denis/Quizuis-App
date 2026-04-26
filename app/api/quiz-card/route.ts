import { db } from "@lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try{
    // Verifică autentificarea

    // returneaza quiz-cardurile din db dupa dificultate sau alte criterii
    const quizCards = await db.quizCard.findMany({
        select: {
          id: true,
          title: true,
          difficulty: true,
          quizPath: true,
          authorId: true,
          quiz: {
            select: {
              questions: {
                select: {
                  id: true,
                }
              }
            }
          }
        }
    });
    return NextResponse.json({
      quizCards
    });
  } catch (error) {
    console.error("Error fetching quiz cards:", error);
    return NextResponse.json(
      { error: "Eroare la preluarea quiz-urilor" },
      { status: 500 }
    );
  }
}
