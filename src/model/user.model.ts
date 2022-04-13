import mongoose from "mongoose";
//Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  }
},{timestamps:true});
export interface UserDocument extends mongoose.Document{
    email :string,
    name : string,
    password : string,
    createdAt : Date,
    updatedAt : Date,
    comparePassword(candidatePassword:string): Promise<boolean>;
}

// Used for logging in
UserSchema.methods.comparePassword = async function (
    candidatePassword: string
  ) {
    const user = this as UserDocument;
  
    return candidatePassword ==  user.password;
  };

 const User= mongoose.model<UserDocument>('User', UserSchema);
export default User;
