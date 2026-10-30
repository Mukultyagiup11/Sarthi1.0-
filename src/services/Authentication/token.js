import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
dotenv.config();

export const createToken = (data)=>{
    return jwt.sign(
        {
        sub:String(data.id),
        accoutType:data.account_type
        },
        process.env.JWT_SECERT,
        {
            expiresIn:process.env.JWT_EXPIRES_IN||"1h"
        }
    );
};

export default {
    createToken
}


