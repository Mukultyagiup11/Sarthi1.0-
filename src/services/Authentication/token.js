import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export const createToken = (data)=>{
     const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is missing. Check your .env configuration.");
    }
    return jwt.sign(
        {
        sub:String(data.id),
        accoutType:data.account_type
        },
        secret,
        {
            expiresIn:process.env.JWT_EXPIRES_IN||"1h"
        }
    );
};

export default {
    createToken
}


