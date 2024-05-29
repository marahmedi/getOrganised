import { Request, Response } from "express";
import { pool } from "../app";


const getAllLists = (req: Request, res: Response): void => {

    pool.query(
      "SELECT * FROM lists ORDER BY list_id",
      (err, result) => {
        if (err) {
          console.error("Error retrieving tasks for today:", err);
          res.status(500).json({ error: "Internal server error" });
          return;
        }
  
        const lists = result.rows;
        res.status(200).json(lists);
      }
    );
};



export {getAllLists}