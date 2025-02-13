// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    quizzes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Quiz', // Reference to the Quiz model
        },
    ],
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;