// app/api/register/route.js
import { NextResponse } from 'next/server';

import bcrypt from 'bcrypt';
import connectToDatabase from '@/db/connectdb';
import User from '@/db/user';

export async function POST(request) {
    await connectToDatabase();

    try {
        const { name, email, password } = await request.json();

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            username: name,
            email,
            password: hashedPassword,
        });

        return NextResponse.json({ user: newUser }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}