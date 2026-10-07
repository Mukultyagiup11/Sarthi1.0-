const validateRequest = (req,res)=>{
    if(!req.headers["content-type"]?.includes("application/json")){
        res.status(400).send({
            error:"Content-Type must be the application/json"
        });
        return false;
    }
    const data = req.body;
    if(!data){
        res.status(400).send({
            error:"Request body is required."
        })
        return false;
    }

   if(typeof data!=='object' || Array.isArray(data)){
    res.status(400).send({
        error:"Invalid Request body format."
    })
    return false;
   }
   return data;
};


const validateFormRequest = (req,res)=>{
     if(!req.headers["content-type"]?.includes("multipart/form-data")){
       res.status(400).send({
        error:"Content-Type must be multipart/form-data"
       })
       return false;
     }
   const data = req.body;
  
   if(!data){
    res.status(400).send({
        error:"Request body is required."
    })
    return false;
   }
  if(typeof data!== "object" || Array.isArray(data)){
     res.status(400).send({
       error:"Invalid request body format"
     })
     return false;
  }
   data.file=req.file;//Multer middelware will use to handle the file.
  return data;
}

export default {
    validateRequest,
    validateFormRequest
}