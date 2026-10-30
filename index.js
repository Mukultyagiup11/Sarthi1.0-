import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './src/routes/v1/sarthi';
dotenv.config();
const app = express();

//Middelware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//Test Route
app.get('/',(req,res)=>{
   res.status(200).json({
    message:`Sarthi Backend is running!.`
   })
}
)

app.use('/v1',router);


const PORT = process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`https://localhost:${PORT}`);
});


