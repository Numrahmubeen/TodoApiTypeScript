import User, { UserDocument } from "../model/user.model";
import { LeanDocument, FilterQuery,DocumentDefinition, UpdateQuery } from "mongoose";
import { omit } from "lodash";
import { sign } from "../utils/jwt.utils";

export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    return await User.create(input);
  } catch (err) {
    throw new Error(" "+err);
  }
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return User.findOne(query).lean();
}

export function createAccessToken(
    email:string,_id:string,name:string
  ) {
    // Build and return the new access token
    const accessToken = sign(
      { 
          email,
          _id,
          name
    },
      { expiresIn: "2d" } // 15 minutes
    );
  
    return accessToken;
  }

export async function validatePassword({
  email,
  password,
}: {
  email: UserDocument["email"];
  password: string;
}) {
  const user = await User.findOne({ email });

  if (!user) {
    return null;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return null;
  }

  return omit(user.toJSON(), "password");
}