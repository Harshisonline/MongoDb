import express from 'express';
import { UserModel, TodoModel } from './db.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';

const JWT_SECRET='hello this is harsh';


const mongoURI = "mongodb+srv://Harsh:HARSH123456789@cluster0.lsczt.mongodb.net/toda-app-database";

mongoose.connect(mongoURI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
});

const app = express();
app.use(bodyParser.json());
app.use(express.json());


function auth(req,res,next){
    const token=req.headers.token;

    const verify = jwt.verify(token,JWT_SECRET);

    if(verify){
        req.userId=verify.id;
        next();
    }
    else{
        res.status(403).json({
            message:"User not authenticated"
        })
    }
    
}

app.get('/', (req, res) => {
    res.send("hello world");
});

app.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;
    console.log(req)

    try {
        await UserModel.create({
            email: email,
            password: password,
            name: username
        });

        res.json({
            message: "you are logged in"
        });
    } catch (err) {
        console.error('Error creating user:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/signin',async (req,res)=>{
    const { username, password} = req.body;

    const user=await UserModel.findOne({name:username,password:password});
    console.log(user);

    if(user){
        const token=jwt.sign({id:user._id},JWT_SECRET);
        res.json({
            messagae:'Sign in successfull',
            token:token
        })
    }else{
        console.log("Error");
        res.status(500);
    }
})

app.post('/add-todos',auth,async (req,res)=>{
    const userId = req.userId;
    const {Description,isDone} = req.body;

    const result = await TodoModel.create({
        userId,
        Description,
        isDone
    })

    if(result){
        res.json({
            message:'Todo is added successfully'
        })
    }else{
        res.status(500).json({
            messagae:'Error Occured'
        })
    }
})

app.get('/get-todos',auth,async (req,res)=>{
    const userId = req.userId;

    const result = await TodoModel.find({
        userId,
    })

    if(result){
        res.json({
            todos:result,
        })
    }else{
        res.status(500).json({
            messagae:'Error Occured'
        })
    }
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});