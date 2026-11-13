import express from 'express';
const router = express.Router();
import sarthiController from '../../controller/sarthi.js'

//signUp API

router.post('/operations/signUp',async(req,res)=>{
    return  sarthiController.signUp(req,res);
})


//login API
router.post('/operations/login',async(req,res)=>{
    return sarthiController.login(req,res);
})


//App Intro record API

export default router;




