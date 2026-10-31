import genrateToken from './token.js';
import connection from '../../database/utils/connection.js';
import bcrypt from 'bcryptjs';
import {
    checkExistingUserQuery,
    userInsertQuery,
    captainInsertQuery
 } from '../../database/models/validation.js';
const ACCOUNT_TYPE= {
   USER:1,
   CAPTAIN:2
}

export const signUp = async(data)=>{
    const {firstName,
        lastName,email,
        number,password,account_type,
        latitude='',longitude='',
        vehicleType,vehicleNumber,
        city,
        type}=data; 
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
    const normalizedPhone = String(number).trim();
    //EMAIL test case
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            return {
                statusCode:200,
                body:{
                success: true,
                message: "Please enter a valid email address."
                }
            }
        }
   //Number Test Case
   if (!/^\+?[0-9]{7,15}$/.test(normalizedPhone)){
            
        return {
            statusCode:200,
                body:{
                success: true,
                message: "Please enter a valid phone number."
                }
        }
        }

    //Password Test Case
      if(typeof password !== "string" ||password.length < 8 ||Buffer.byteLength(password, "utf8") > 72){
        return {
            statusCode:200,
                body:{
                success: true,
                    message: "Password must be at least 8 characters and no more than 72 bytes."
                }
        }
        }
     const normalizedFirstName =  String(firstName).trim();
     if (normalizedFirstName.length === 0 ||normalizedFirstName.length > 50) {
            return {
                statusCode:200,
                body:{
                success:  true,
                message: "First name must contain between 1 and 50 characters."
                }
            }
        }
     const normalizedLastName  =  String(lastName).trim();
     if(normalizedLastName === 0 || normalizedLastName.length >50){
        return{
            statusCode:200,
                body:{
                success:true,
                message:`Last name must contain between 1 and 50 characters.`
                }
        }
     }
    //validate optional lat and lang
    const lat = latitude === undefined || latitude === null || latitude === "" ? null:latitude;
    const lang = longitude === undefined || longitude === null || longitude === "" ? null : longitude;
    if ((lat !== null &&(!Number.isFinite(lat) || lat < -90 || lat > 90)) ||(lang !== null && (!Number.isFinite(lang) || lang < -180 || lang > 180))){
            return{
                statusCode:200,
                body:{
                success: true,
                message: "Invalid latitude or longitude."
                }
            }
    }
    if((lat===null)!==(lang === null)){
        return{
            statusCode:200,
                 body:{
                     success:true,
                     message:"Lat and lang must be provided together."
                }} 
    }

    const validVehicleTypes = ["Bike", "Auto", "E-Rickshaw","Car"];
    let normalizedVechileNumber;
    let normalizedCity;
    if(accountType === ACCOUNT_TYPE.CAPTAIN){
       normalizedVechileNumber = typeof vehicleNumber === "string" ?  vehicleNumber.trim().toUpperCase():"";
       normalizedCity = typeof city === "string" ? city.trim() :"";
       if(!validVehicleTypes.includes(vehicleType)){
          return {
            statusCode:200,
            body:{
              success:false,
              message:`Invalid Vechile Type.`
            }
          }
       }
       if(!normalizedVechileNumber || normalizedVechileNumber.length >20){
         return {
            statusCode:200,
            body:{
                success:false,
                message:`Invalid vechileNumber.`
            }
         }
       }
       if(!normalizedCity || normalizedCity.length >100){
            return {
                statusCode:200,
                body:{
                    success:false,
                    message:`Invalid City.`
                }
            }
       }
    }
    const reader = await connection.getReaderConnection(type);
    const writer = await connection.getWriterConnection(type);
    try {
      const [userRows] = await reader.query(checkExistingUserQuery,[normalizedEmail,normalizedPhone]);
      if(userRows.length > 0){
        return {
            statusCode:200,
            body:{
                success:false,
                message:`An account with this email and phoneNumber is already exists.`
            }
        }
      }
      const hashedPassword = await bcrypt.hash(password,10);
      const [result] =await writer.query(userInsertQuery,[firstName,lastName,normalizedEmail,normalizedPhone,hashedPassword,accountType,latitude,longitude]);
      const userId = result.insertId;
      if(accountType === ACCOUNT_TYPE.CAPTAIN){
        const fullName = `${normalizedFirstName}${normalizedLastName}`;
        await writer.query(captainInsertQuery,[
            userId,
            fullName,
            vehicleType,
            normalizedVechileNumber,
            normalizedCity,
            "offline"
        ]);
      }
      const user ={
          id:result.insertId,
          firstName:normalizedFirstName,
          lastName:normalizedLastName,
          Phone:normalizedPhone,
          Password:hashedPassword,
          account_type:accountType === ACCOUNT_TYPE.USER?'User':'Captain',
          latitude:lat,
          longitude:lang
      } 
      const token = genrateToken.createToken(user);
      return {
        statusCode:200,
        body:{
            success:true,
            message:accountType === ACCOUNT_TYPE.USER ? 'User Account Created SuccessFully.':'Captain Account Created SuccessFully.',
            token,
            user
        }
      }
    } catch (error) {
        console.log('Internal server error.',error);
        return{
            statusCode:200,
             body:{
                success:false,
                message:`Internal Server Error.`
            }
        }
    }finally{
        if(reader){
            await  reader.end();
        }
        if(writer){
           await writer.end();
        }
    }

}

export default {
    signUp
}