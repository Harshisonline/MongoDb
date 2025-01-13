import express from 'express';
import { UserModel, TodoModel } from './db.js';
import mongoose from 'mongoose';

const mongoURI = "mongodb+srv://Harsh:HARSH123456789@cluster0.lsczt.mongodb.net/toda-app-database";

mongoose.connect(mongoURI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
});

const app = express();
app.use(express.json());

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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});