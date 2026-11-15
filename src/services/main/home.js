import {checkIntroQuery1,completeIntroJourneyQuery} from "../../database/models/homeQuery.js";
import connection from "../../database/utils/connection.js";
export const introApp = async(data)=>{
    const {userId,introStatus,type} =  data;
    if(!userId || !introStatus || !type){
       console.log(`userId,introStatus and type are required.`);
       return {
        statusCode:400,
        body:{
            success:false,
            message:`userId,introStatus and type are required.`
        }
       } 
    }

    const reader = await connection.getReaderConnection(type);
    const writer = await connection.getWriterConnection(type);
    try {
        const [row1] = await reader.query(checkIntroQuery1,[userId]);
        console.log(row1);
        if(row1.length){
            console.log(`User already seen the intro slides.`);
            return {
                statusCode:400,
                body:{
                    success:false,
                    message:`User already seen the intro slides.`
                }
            }
        }

        await writer.query(completeIntroJourneyQuery,[userId]);
        return {
            stausCode:200,
            body:{
                success:true,
                message:`Get Started`,
                getStarted:true  //flag for the next screen.
            }
        }
    } catch (error) {
        console.log(`Internal server error.`,error);
        return {
            statusCode:400,
            body:{
                success:false,
                message:`Internal server error.`
            }
        }
    }finally{
        if(reader){
            await reader.end();
        }
          if(writer){
            await writer.end();
        }
    }
}

export default {
   introApp
}