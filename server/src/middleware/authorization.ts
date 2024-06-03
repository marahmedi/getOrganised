import { Request, Response, NextFunction } from "express";

export interface CustomRequest extends Request {
  user?: string;
}

const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const jwtToken = req.header("token");
  if (!jwtToken) {
    return res.status(403).json({ msg: "Not Authorized" });
  }

  try {
    const payload = jwt.verify(
      jwtToken,
      process.env.jwtSecret as string
    ) as any;

    req.user = payload.user;
  } catch (err) {
    console.error(err);
    return res.status(403).json("Not Authorized");
  }
  next();
};
