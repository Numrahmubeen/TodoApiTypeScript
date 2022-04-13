import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { decode } from "../utils/jwt.utils";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const token = get(req, "headers.token");

  if (!token)  {
      res.sendStatus(403).send("Token not provided!");
      return next();
    }

  const { decoded, expired } = decode(token);

  if (decoded) {
    // @ts-ignore
    req.user = decoded;

    return next();

  }

  return next();
};

export default deserializeUser;