import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try{
    // Verifică autentificarea

    // returneaza quiz-urile din db

    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Neautorizat" },
        { status: 401 }
      );
    }

    // gaseste quiz-urile global nu doar ale user-ului 
    const quizes = await db.quiz.findMany({
      include: {
        results: true,
      },
    })
    return NextResponse.json({
      quizes,
    });
  } catch (error) {
    console.error("Error fetching quiz results:", error);
    return NextResponse.json(
      { error: "Eroare la preluarea rezultatelor" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Neautorizat" },
        { status: 401 }
      );
    }

    // Preia datele din corpul cererii
    const { quizName, difficulty, questions, authorId } = await req.json();

    // Daca exista deja un quiz cu acelasi nume, returneaza eroare
    const existingQuiz = await db.quiz.findFirst({
      where: { title: quizName },
    });

    if (existingQuiz) {
      return NextResponse.json(
        { error: "Quiz-ul există deja" },
        { status: 409 }
      );
    }

    // Salveaza quiz-ul in baza de date
    const newQuiz = await db.quiz.create({
      data: {
        title: quizName,
        difficulty,
        authorId,
      },
    });

    // Daca adaugam quiz-ul, adaugam in db si questions


    const questionsData = await db.question.createMany({
      data: questions.map((question: any) => ({
        questionText: question.questionText,
        questionImg: question.imgUrl !== "" ? question.imgUrl : null,
        questionType: question.type,
        options: question.options, // options este array de string-uri si Prisma il va salva ca JSON
        answer: question.correctAnswer,
        feedbackCorect: question.corectFeedback ? question.corectFeedback : null,
        feedbackGresit: question.gresitFeedback ? question.gresitFeedback : null,
        quizId: newQuiz.id,
      })),
    });

    // Adaugam si quizCard in db
    const quizCard = await db.quizCard.create({
      data: {
        title: quizName,
        quizPath: quizName.toLowerCase().replace(/\s+/g, '-'),
        authorId: session.user.id,
        difficulty,
        quizId: newQuiz.id,
      },
    })

    return NextResponse.json({ message: "Quiz salvat cu succes", quiz: newQuiz, questions: questionsData, quizCard });
  } catch (error) {
    console.error("Error saving quiz:", error);
    return NextResponse.json(
      { error: "Eroare la salvarea quiz-ului" },
      { status: 500 }
    );
  }
}