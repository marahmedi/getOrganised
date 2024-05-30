// authController.ts
import { Request, Response } from "express";
import { pool } from "../app";


interface User {
  user_id: number;
  user_name: string;
  email: string;
  password: string;
}

const bcrypt = require("bcrypt");

const jwtGenerator = require("../utils/jwtGenerator")

const loginUser = async(req: Request, res: Response): Promise<any> => {

  // 1. destructure the req.body
  const { email, password } = req.body;

  
  const user = await pool.query<User>(

    // check if user doesn't exist (if not we throw an error)
    "SELECT * FROM users WHERE email = $1 ",
    [email],);

    if(user.rows.length == 0) {
      return res.status(401).json("Password or email is incorrect");
    }

    // Now we know user exists
    //3. check if user password is correct using bcrypt

    const validPassword: boolean = await bcrypt.compare(password, user.rows[0].password)

    if(!validPassword){
      return res.status(401).json("Password or email is incorrect");
    }

    //Give the client the jwt token
    const token = jwtGenerator(user.rows[0].user_id)
    res.json(token)
};

const newUser = async (req: Request, res: Response): Promise<any> => {
  try {
    // 1. destructure the req.body (user_name, email, password)
    const { user_name, email, password } = req.body;

    //2. check if the user exists (if user exists throw error)
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length !== 0) {
      return res.status(401).send("user already exists"); // unautheticated as user already exists
    }
    //if user doesnt exist move on
    //3. Bcrypt new user password

    const saltRounds = 10; // how many times password is encrypted

    const salt = await bcrypt.genSalt(saltRounds);

    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (user_name, email, password) VALUES($1, $2, $3) RETURNING *",
      [user_name, email, bcryptPassword]
    );

    const token = jwtGenerator(newUser.rows[0].user_id)

    res.json({token})
    
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
 
};

const isVerified = (req: Request, res: Response) => {

  try{

    res.json(true)

  }catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

export { loginUser, newUser, isVerified };
