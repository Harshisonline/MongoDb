import express from 'express';
import { UserModel, TodoModel } from './db.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import bycrpt from 'bcrypt';
import {z} from 'zod';

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
    const reqbodySignup = z.object({
        username:z.string(),
        password:z.string(),
        email:z.string().email()
    })

    const parsedBody = reqbodySignup.safeParse(req.body);

    if(!parsedBody.success){
        console.log(parsedBody.error.issues)
        res.json({
            message:parsedBody.error.issues[0].message
        })
        return
    }

    const { username, password, email } = req.body;
    try {
        const hashedPass=await bycrpt.hash(password,5);

        await UserModel.create({
            email: email,
            password: hashedPass,
            name: username
        });

        res.json({
            message: "you are Signed up"
        });
    } catch (err) {
        console.error('Error creating user:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/signin',async (req,res)=>{
    const { username, password} = req.body;

    const Non_user=await UserModel.findOne({name:username});

    const verfied = await bycrpt.compare(password,Non_user.password);

    if(verfied){
        const token=jwt.sign({id:Non_user._id},JWT_SECRET);
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