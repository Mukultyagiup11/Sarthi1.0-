import express from 'express';
const router = express.Router();
import sarthiController from '../../controller/sarthi.js'

//signUp API

router.post('/operations/signUp',async(req,res)=>{
    return  sarthiController.signUp(req,res);
})

export default router;




