import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server';

export function verifytoken(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
        console.log("No token cookie");
        return null;
    }

    try {
        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as { id: string; username: string };

        return decode;

    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}