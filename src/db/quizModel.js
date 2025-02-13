'use server'
import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    icon: {
        type: Number,
        required: true,
        default: 0
    },
    quizzQuestions: [
        {
            mainQuestion: {
                type: String,
                required: true,
            },
            choices: {
                type: [String],
                required: true,
            },
            correctAnswer: {
                type: Number,
                required: true,
            },
            answeredResult: {
                type: Number,
                default: -1, // -1 means not answered yet
            },
            statistics: {
                totalAttempts: {
                    type: Number,
                    default: 0,
                },
                correctAttempts: {
                    type: Number,
                    default: 0,
                },
                incorrectAttempts: {
                    type: Number,
                    default: 0,
                },
            },
        },
    ],
});

const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);

export default Quiz;