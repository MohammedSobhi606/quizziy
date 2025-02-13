
import connectToDatabase from '@/db/connectdb';
import Quiz from '@/db/quizModel';
import User from '@/db/user';
import { revalidatePath } from 'next/cache';

import { NextResponse } from 'next/server';

export async function GET(request) {
    await connectToDatabase();
    const userId = request.nextUrl.searchParams.get('userId');
    console.log(userId);

    if (!userId) {
        return NextResponse.json({ success: false, error: 'Invalid user id' }, { status: 400 });
    }

    try {
        const data = await User.findById(userId).populate('quizzes');
        console.log(data);

        return NextResponse.json({ success: true, quizzes: data.quizzes });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
export async function POST(request) {
    await connectToDatabase();


    try {
        const data = await request.json();

        console.log('fdd', data.quizData);

        const quiz = await Quiz.create(data.quizData);
        // save quiz  id in user model 
        await User.findByIdAndUpdate(data.userId, { $push: { quizzes: quiz._id } }, { new: true });

        return NextResponse.json({ success: true, quiz });

    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// delete function 

export async function DELETE(request) {
    await connectToDatabase();



    try {
        const quizId = request.nextUrl.searchParams.get('quizId');


        await Quiz.findByIdAndDelete(quizId);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// update function

export async function PUT(request) {
    await connectToDatabase();

    try {
        const quizId = request.nextUrl.searchParams.get('quizId');
        const updatedQuizData = await request.json();

        const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, updatedQuizData, { new: true });

        revalidatePath(`/`);

        return NextResponse.json({ success: true, quiz: updatedQuiz });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}