import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import  { Difficulty } from '@/types/type';

const normalizeDifficulty = (value: unknown): Difficulty => {
  const normalized = String(value).trim().toLowerCase();

  if (normalized === 'usor' || normalized === 'easy') return 'Usor';
  if (normalized === 'mediu' || normalized === 'medium') return 'Mediu';
  if (normalized === 'dificil' || normalized === 'greu' || normalized === 'hard') return 'Dificil';

  throw new Error('Dificultate invalidă');
};

export async function POST(req: NextRequest) {
  try {
    // Verifică autentificarea
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Neautorizat" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { quizId, quizName, score, total, percentage, difficulty: difficultyRaw } = body;

    let difficulty: Difficulty;
    try {
      difficulty = normalizeDifficulty(difficultyRaw);
    } catch (error) {
      return NextResponse.json(
        { error: 'Dificultate invalidă' },
        { status: 400 }
      );
    }

    // Găsește user-ul
    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilizatorul nu a fost găsit" },
        { status: 404 }
      );
    }

    // Salvează rezultatul
    const quizResult = await db.quizResult.create({
      data: {
        userId: user.id,
        quizId,
        quizName,
        score,
        totalQuestions: total,
        percentage,
        difficulty,
        createdAt: new Date(),
      },
    });

    return NextResponse.json(
      { 
        message: "Rezultat salvat cu succes",
        result: quizResult 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error saving quiz result:", error);
    return NextResponse.json(
      { error: "Eroare la salvarea rezultatului" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Neautorizat" },
        { status: 401 }
      );
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
      include: {
        results: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    return NextResponse.json({
      results: user?.results || [],
    });

  } catch (error) {
    console.error("Error fetching quiz results:", error);
    return NextResponse.json(
      { error: "Eroare la preluarea rezultatelor" },
      { status: 500 }
    );
  }
}