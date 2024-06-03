import { Request, Response, NextFunction  } from "express";

module.exports = (req: Request, res: Response, next: NextFunction) => {
    const { email, user_name, password } = req.body;
  
    function validEmail(userEmail: string) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/signup") {
      console.log(!email.length);
      if (![email, user_name, password].every(Boolean)) {
        return res.status(401).json({err: "Missing Credentials"});
      } else if (!validEmail(email)) {
        return res.status(401).json({err: "Invalid Email"});
      }
    } else if (req.path === "/login") {
      if (![email, password].every(Boolean)) {
        return res.status(401).json({err: "Missing Credentials"});
      } else if (!validEmail(email)) {
        return res.status(401).json({err:"Invalid Email"});
      }
    }
  
    next();
  };