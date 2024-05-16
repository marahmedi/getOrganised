import { Request, Response } from "express";
import { pool } from "../app";

// Get today's date in YYYY-MM-DD format
const todayDate = new Date().toISOString().split("T")[0];

const createTask = (req: Request, res: Response): void => {
    const { task_name, due_datetime, list_id, list_name, user_id } = req.body;
  
    pool.query("BEGIN", async (beginErr) => {
      if (beginErr) {
        console.error("Error starting transaction:", beginErr);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
  
      try {
        let finalListId: number;
  
        if (list_id) {
          // Use the provided list_id
          finalListId = list_id;
        } else if (list_name) {
          // Create a new list if list_name is provided
          const newListResult = await pool.query(
            "INSERT INTO lists (list_name, user_id) VALUES ($1, $2) RETURNING list_id",
            [list_name, user_id] // Assuming user ID is available in the request
          );
  
          finalListId = newListResult.rows[0].list_id;
        } else {
          // Return an error if neither list_id nor list_name is provided
          pool.query("ROLLBACK", (rollbackErr) => {
            if (rollbackErr) {
              console.error("Error rolling back transaction:", rollbackErr);
            }
            res
              .status(400)
              .json({ error: "Either list_id or list_name must be provided" });
          });
          return;
        }
  
        // Insert the new task into the database using the finalListId
        await pool.query(
          "INSERT INTO tasks (task_name, due_datetime, list_id, status) VALUES ($1, $2, $3, $4)",
          [task_name, due_datetime, finalListId, false]
        );
  
        // Commit the transaction
        pool.query("COMMIT", (commitErr) => {
          if (commitErr) {
            console.error("Error committing transaction:", commitErr);
            res.status(500).json({ error: "Internal server error when committing" });
            return;
          }
  
          res.status(201).json({ message: "Task created successfully" });
        });
      } catch (error) {
        // Rollback the transaction in case of an error
        pool.query("ROLLBACK", (rollbackErr) => {
          if (rollbackErr) {
            console.error("Error rolling back transaction:", rollbackErr);
          }
          console.error("Error creating new task:", error);
          res.status(500).json({ error: "Internal server error" });
        });
      }
    });
  };
  

const getTasksForToday = (req: Request, res: Response): void => {

  // Retrieve tasks for today's date from the database
  pool.query(
    "SELECT * FROM tasks WHERE DATE(due_datetime) = $1",
    [todayDate],
    (err, result) => {
      if (err) {
        console.error("Error retrieving tasks for today:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      const tasks = result.rows;
      res.status(200).json(tasks);
    }
  );
};

const getTasksForDate = (req: Request, res: Response): void => {
  const date = req.params.date;
  pool.query(
    "SELECT * FROM tasks WHERE DATE(due_datetime) = $1",
    [date],
    (err, result) => {
      if (err) {
        console.error("Error retrieving tasks for today:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      const tasks = result.rows;
      res.status(200).json(tasks);
    }
  );
};

const getTasksForListAndToday = (req: Request, res: Response): void => {

    const listId: string = req.params.list_id;

  pool.query(
    'SELECT * FROM tasks WHERE list_id = $1 AND DATE(due_datetime) = $2',
    [listId, todayDate],
    (err, result) => {
      if (err) {
        console.error("Error retrieving tasks for today:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      const tasks = result.rows;
      res.status(200).json(tasks);
    }
  );
};
const getTasksForListAndDate = (req: Request, res: Response): void => {

    const date = req.params.date;
    const listId = req.params.list_id

  pool.query(
    'SELECT * FROM tasks WHERE list_id = $1 AND DATE(due_datetime) = $2',
    [listId, date],
    (err, result) => {
      if (err) {
        console.error("Error retrieving tasks for today:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      const tasks = result.rows;
      res.status(200).json(tasks);
    }
  );
};
const getCompletedTasksForToday = (req: Request, res: Response): void => {

  pool.query(
    'SELECT * FROM tasks WHERE status = $1 AND DATE(due_datetime) = $2',
    [true, todayDate],
    (err, result) => {
      if (err) {
        console.error("Error retrieving tasks for today:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      const tasks = result.rows;
      res.status(200).json(tasks);
    }
  );
};
const getCompletedTasksForDate = (req: Request, res: Response): void => {

    const date = req.params.date;

  pool.query(
    'SELECT * FROM tasks WHERE list_id = $1 AND DATE(due_datetime) = $2',
    [true, date],
    (err, result) => {
      if (err) {
        console.error("Error retrieving tasks for today:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      const tasks = result.rows;
      res.status(200).json(tasks);
    }
  );
};

export {
  createTask,
  getTasksForToday,
  getTasksForDate,
  getTasksForListAndToday,
  getTasksForListAndDate,
  getCompletedTasksForToday,
  getCompletedTasksForDate,
};
