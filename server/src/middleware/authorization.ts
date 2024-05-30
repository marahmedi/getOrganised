import { Request, Response, NextFunction  } from "express";

interface CustomRequest extends Request {
    user?: string;
}

const jwt = require("jsonwebtoken");

require("dotenv").config()

module.exports = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {

    const jwtToken = req.header("token");
    if(!jwtToken) {
        return res.status(403).json("Not Authorized");
    }
    const payload = jwt.verify(jwtToken, process.env.jwtSecret as string) as any;

    req.user = payload.user;

  } catch (err) {
    console.error(err);
    return res.status(403).json("Not Authorized");
  }
  next()
};
