import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import Notes2 from './src/redux/server/Notes2';
import mongoose from 'mongoose';
import http from "http";

dotenv.config();
const app = express();
const port = 5000;
app.use(express.json())
const server = http.createServer(app);

mongoose.connect('mongodb+srv://admin:vNyLVQug8B7quWE4@cluster0.3avkh2c.mongodb.net')
.then(()=>console.log('DB Connected'))
.catch((err)=> console.log(err))

app.get('/', (req: Request, res: Response)=>{
    res.send('Express and Typescript server and will use mongodb');
    console.log('Express and Typescript server and will use mongodb');
    // res.get(`${res}`) 
})

app.post('/newNote2', async (req: Request, res: Response)=>{
    try{
        const {title, note} = req.body
        const newNote = new Notes2({
            title, note
        })
        await newNote.save();
        res.status(200).json({ status: 'OK Note2 saved'})
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Note2 not saved"})
    }
})

app.get('/getNotes', async (req: Request, res: Response)=>{
    try{
        const notes = await Notes2.find({})
        res.status(200).json({notes})
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Notes not found"})  
    }
})

app.listen(port, () => {console.log(`[server]: Server is running at port ${port}`)});