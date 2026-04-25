import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { db } from "@/lib/prisma";
import { QuizCardType, QuestionProps } from "@/types/type";

export async function GET(req : NextRequest, { params }: { params: Promise<{ quiz_path: string }> }) {
  try{
    const session = await getServerSession(authOptions);
    if(!session?.user?.email){
      return NextResponse.json({error: "Neautorizat"},{status: 401});
    }
    const { quiz_path } = await params;
    if(!quiz_path){
      return NextResponse.json({error: "Quiz path lipsa"}, {status: 400});
    }

    const quizCard = await db.quizCard.findUnique({
      where: {
        quizPath: quiz_path
      },
      select: {
        quizId: true,
        id: true,
        title: true,
        difficulty: true,
        quizPath: true,
        authorId: true,
      }
    });

    if(!quizCard){
      return NextResponse.json({error: "Quiz-ul nu a fost gasit"},{status: 404});
    }

    const questions = await db.question.findMany({
      where: {
        quizId: quizCard.quizId,
      },
      select: {
        questionText: true,
        questionType: true,
        questionImg: true,
        answer: true,
        options: true,
        feedbackCorect: true,
        feedbackGresit: true,
      }
    });

    const quizData : {quizCard: QuizCardType | null, questions: QuestionProps[] | null} = {
      quizCard: { ...quizCard, hasUserSolved: false } as QuizCardType,
      questions: questions.map(q => ({
        ...q,
        questionImg: q.questionImg ?? undefined,
        feedbackCorect: q.feedbackCorect ?? undefined,
        feedbackGresit: q.feedbackGresit ?? undefined,
      })) as QuestionProps[],
    };

    return NextResponse.json(quizData, {status: 200});

  } catch(error : any){
    return NextResponse.json({error: error.message}, {status: 500});
  }
}