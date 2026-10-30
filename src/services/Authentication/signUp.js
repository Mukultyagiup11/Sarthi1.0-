import token from './token.js';
import connection from '../../database/utils/connection.js';
import {checkExistingUserQuery} from '../../database/models/validation.js';
const ACCOUNT_TYPE= {
   USER:1,
   CAPTAIN:2
}

export const signUp = async(data)=>{
    const {firstName,lastName,email,number,password,account_type,latitude,longitude,type}=data; 
    if(!firstName || !lastName || ! email || !number || !password || !account_type||!type){
         console.log(`firstName,lastName,email,number,password,account_type and type are required fields.`);
         return {
            statusCode:200,
            body:{
                success:false,
                message:`firstName,lastName,email,number,password,account_type and type are required fields.`
            }
         }
    }
    const accountType = Number(account_type);
    if(![ACCOUNT_TYPE.USER,ACCOUNT_TYPE.CAPTAIN].includes(accountType)){
     console.log(`Invalid AccountType.`);
     return {
        statusCode:200,
        body:{
            success:true,
            message:`Inavlid AccountType.`
        } 
     }
    }
    const normalizedEmail = String(email).trim().toLowerCase();
    const normalizedPhone = String(phone).trim();
    //EMAIL test case
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            return res.status(200).json({
                success: true,
                message: "Please enter a valid email address."
            });
        }
   //Number Test Case
   if (!/^\+?[0-9]{7,15}$/.test(normalizedPhone)){
            
        return res.status(200).json({
                success: true,
                message: "Please enter a valid phone number."
            });
        }

    //Password Test Case
      if(typeof password !== "string" ||password.length < 8 ||Buffer.byteLength(password, "utf8") > 72){
        return res.status(200).json({
                    success: true,
                    message: "Password must be at least 8 characters and no more than 72 bytes."
            });
        }
     const normalizedFirstName =  String(firstName).trim();
     if (normalizedFirstName.length === 0 ||normalizedFirstName.length > 50) {
            return res.status(200).json({
                success:  true,
                message: "First name must contain between 1 and 50 characters."
          });
        }
     const normalizedLastName  =  String(lastName).trim();
     if(normalizedLastName === 0 || normalizedLastName.length >50){
        return res.status(200).send({
            success:true,
            message:`Last name must contain between 1 and 50 characters.`
        })
     }
    //validate optional lat and lang
    const lat = latitude === undefined || latitude === null || latitude === "" ? null:latitude;
    const lang = longitude === undefined || longitude === null || longitude === "" ? null : longitude;
    if ((lat !== null &&(!Number.isFinite(lat) || lat < -90 || lat > 90)) ||(lang !== null && (!Number.isFinite(lang) || lang < -180 || lang > 180))){
            return res.status(200).send({
                success: true,
                message: "Invalid latitude or longitude."
            });
    }
    if((lat===null)!==(lang === null)){
        return res.status(200).send({
            success:true,
            message:"Lat and lang must be provided together."
        })
    }
    const reader = await connection.getReaderConnection(type);
    const writer = await connection.getWriterConnection(type);
    try {
      const {} = reader.execute();
    } catch (error) {
        
    }finally{

    }

}

export default {
    signUp
}