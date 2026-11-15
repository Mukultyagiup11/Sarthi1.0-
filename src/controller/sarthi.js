import validationFunction from "./validation.js"
import authenticationService from '../services/Authentication/signUp.js';
import homeService from "../services/main/home.js";

export const signUp = async(req,res)=>{
   try {
      const data = validationFunction.validateRequest(req,res);
      if(!data){
        return res.status(400).send({
            success:false,
            message:`req body is empty.`
        })
      }
      const result = await authenticationService.signUp(data);
      return res.status(result.statusCode||200).send(result.body||result);
   } catch (error) {
      console.log(`Unable to singup the user.`);
      return res.status(500).send({
        success:false,
        message:`Unable to singup the user.`,
        error: process.env.NODE_ENV === "development"
            ? error.message
            : undefined
      })
   }
}

export const login = async(req,res)=>{
   try {
      const data = validationFunction.validateRequest(req,res);
      if(!data)return;
      const result = await authenticationService.login(data);
      return res.status(result.statusCode||200).send(result.body||result);
   } catch (error) {
      console.log(`Error in login.`);
      return res.status(500).send({
         success:false,
         message:`Error in login.`
      })
   }
}

export const introApp = async(req,res)=>{
   try {
      const data = validationFunction.validateRequest(req,res);
      if(!data)return;
      const result = await homeService.introApp(data);
      return res.status(result.statusCode||200).send(result.body||result);
   } catch (error) {
      console.log(`Error in recording the introRecord Of The Sarthi App.`);
      return res.status(500).send({
         success:false,
         message:`Error in recording the introRecord Of The Sarthi App.`
      })

   }
}


export default {
     signUp,
     login,
     introApp
}