import { Request, Response } from "express";
import { omit } from "lodash";
import { createUser,validatePassword , createAccessToken} from "../service/user.service";
import { UserDocument } from "../model/user.model";


export async function registerUserHandler(req: Request, res: Response) {
  try {

    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (e) {
    console.log(e);
    return res.status(409).send(e);
  }
}

export async function loginUserHandler(req: Request, res: Response) {
     // validate the email and password
     const user = await validatePassword(req.body);
  
     if (!user) {
       return res.status(401).send("Invalid username or password");
     }
     // create access token
     const accessToken = createAccessToken(user.email,user._id,user.name);

        // send access token back
     return res.send({ accessToken });

  }