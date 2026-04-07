import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { db } from "@/lib/prisma";

export async function GET(req : NextRequest, { params }: { params: Promise<{ page_path: string }> }) {
  try{
    const session = await getServerSession(authOptions);
    if(!session?.user?.email){
      return NextResponse.json({error: "Neautorizat"},{status: 401});
    }
    const { page_path } = await params;
    console.log('Requested page_path:', page_path);
    if(!page_path){
      return NextResponse.json({error: "Page path lipsa"}, {status: 400});
    }

    const quiz = await db.quizCard.findUnique({
      where: {quizPath: page_path},
      select: {
        quizPath: true,
        quiz: {
          select: {
            id: true,
            title: true,
            difficulty: true,
            questions: {
              select: {
                id: true,
                questionText: true,
                questionImg: true,
                questionType: true,
                answer: true,
                options: true,
                feedbackCorect: true,
                feedbackGresit: true,
              }
            }
          }
        }
      }
    });

    console.log('Found quiz:', quiz ? 'YES' : 'NO');
    if(quiz) console.log('Quiz data:', { quizPath: quiz.quizPath, quizId: quiz.quiz?.id });

    if(!quiz){
      // For debugging, return all quiz cards
      const allQuizCards = await db.quizCard.findMany({
        select: { id: true, title: true, quizPath: true }
      });
      console.log('All quiz cards in DB:', allQuizCards);
      return NextResponse.json({error: "Quiz-ul nu a fost gasit", requestedPath: page_path, availableQuizzes: allQuizCards.map(c => c.quizPath)},{status: 404});
    }

    return NextResponse.json({quizCard: quiz}, {status: 200});
  } catch(error : any){
    return NextResponse.json({error: error.message}, {status: 500});
  }
}