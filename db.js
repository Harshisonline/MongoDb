import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
    email: String,
    password: String,
    name: String
})

const Todos = new Schema({
    userId: ObjectId,
    Description: String,
    isDone: Boolean
})

const UserModel = mongoose.model('users', User);
const TodoModel = mongoose.model('todos', Todos);

export { UserModel, TodoModel };