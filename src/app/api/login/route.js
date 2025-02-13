// app/api/login/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/db/connectdb';
import User from '@/db/user';

export async function POST(request) {
    await connectToDatabase();

    try {
        const { email, password } = await request.json();

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'Invalid email or password.' }, { status: 400 });
        }

        // Compare the password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return NextResponse.json({ message: 'Invalid email or password.' }, { status: 400 });
        }

        // Generate a JWT token
        const token = {
            userId: user._id,
            username: user.username,
            email: user.email,
        };

        return NextResponse.json({ token }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}