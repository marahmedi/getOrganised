import { Request, Response } from "express";
import { pool } from "../app";
import { CustomRequest } from "../middleware/authorization"; // Adjust the path as necessary

const getAllLists = async (req: CustomRequest, res: Response): Promise<void> => {
  const userId = req.user;

  try {
    const result = await pool.query(
      "SELECT * FROM lists WHERE user_id = $1 ORDER BY list_id",
      [userId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ message: "No lists found for the user" });
      return;
    }

    const lists = result.rows;
    res.status(200).json({"lists":lists});
  } catch (err) {
    console.error("Error getting all lists", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const newList = async (req: CustomRequest, res: Response): Promise<void> => {
  const { list_name } = req.body;
  const userId = req.user;

  if (!list_name) {
    res.status(400).json({ error: "List name is required" });
    return;
  }

  try {
    // Check if the list name already exists for the user
    const existingList = await pool.query(
      "SELECT * FROM lists WHERE list_name = $1 AND user_id = $2",
      [list_name, userId]
    );

    if (existingList.rows.length > 0) {
      res.status(400).json({ error: "List name already exists for this user" });
      return;
    }

    // If the list name is unique, insert the new list into the database
    const newListResult = await pool.query(
      "INSERT INTO lists (list_name, user_id) VALUES ($1, $2) RETURNING *",
      [list_name, userId]
    );

    res.status(201).json(newListResult.rows[0]);
  } catch (err) {
    console.error("Error creating new list:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { newList, getAllLists };
