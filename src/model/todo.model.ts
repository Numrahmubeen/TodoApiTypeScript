import mongoose from "mongoose";

export interface TodoDocument extends mongoose.Document {
    user_id : UserDocument["_id"];
  name: string;
  title: string;
  desc: string;
  state: string;
}

const TodoSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
      },
     title: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
        maxlength: 1
      },
      user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
      }
  },
  { timestamps: true }
);

const Todo = mongoose.model<TodoDocument>("Todo", TodoSchema);

export default Todo;
export interface UserDocument extends mongoose.Document{
    email :string,
    name : string,
    password : string,
    createdAt : Date,
    updatedAt : Date,
    comparePassword(candidatePassword:string): Promise<boolean>;
}


