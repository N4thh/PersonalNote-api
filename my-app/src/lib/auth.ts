import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server';
export function verifytoken (req: NextRequest) {
    //header 
    const header = req.headers.get('authorization');
    //validate header 
    if(!header || !header.startsWith('Bearer ')){ 
        return null;
    }
    //tach token 
    const token = header.substring(7);

    //verify token 
    try{ 
        const decode = jwt.verify(token, process.env.JWT_SECRET!
        ) as { id: string; username: string };
        return decode; 

    }catch(error){
        console.error('Token verification failed:', error);
        return null;
    }
}