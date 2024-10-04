import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { ConnectDb } from '../../lib/config/db';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

async function handleSignup(email, password, role) {
    const db = await ConnectDb();
    // Check if a user exists with the given email and role
    const existingUser = await db.collection('users').findOne({ email, role });

    if (existingUser) {
        return { error: 'Email already exists for this role' };
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = {
        email,
        password: hashedPassword,
        role,
    };

    await db.collection('users').insertOne(newUser);
    return { success: true };
}

async function handleLogin(email, password, role) {
    const db = await ConnectDb();
    // Find user by email and role
    const user = await db.collection('users').findOne({ email, role });

    if (!user) {
        return { error: 'Invalid credentials' };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return { error: 'Invalid credentials' };
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    return { success: true, token };
}

export async function POST(req) {
    const body = await req.json();
    const { type, email, password, role } = body;

    try {
        if (type === 'signup') {
            const response = await handleSignup(email, password, role);
            return NextResponse.json(response);
        }

        if (type === 'login') {
            const response = await handleLogin(email, password, role); // Pass role to handleLogin
            return NextResponse.json(response);
        }

        return NextResponse.json({ error: 'Invalid request' });
    } catch (error) {
        console.error("Error in POST:", error); // Log the error
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}
