import validation from "./validation.js"
import authenticationService from '../services/Authentication/signUp.js';

export const signUp = async(req,res)=>{
   try {
      const data = validation.validateRequest(req,res);
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

export default {
     signUp
}