import { Request, Response } from "express";
import { pool } from "../app";

// Get today's date in YYYY-MM-DD format
const todayDate = new Date().toISOString().split("T")[0];
console.log(new Date());

const createTask = (req: Request, res: Response): void => {
  const {
    task_name,
    start_time,
    end_time,
    list_id,
    list_name,
    task_date,
    notes,
  } = req.body;

  const user_id = (req as any).user; // Assuming user ID is stored here

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
        "INSERT INTO tasks (task_name, start_time, end_time, status, list_name, list_id, task_date, notes ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [task_name, start_time, end_time, false, list_name, list_id, task_date, notes]
      );

      // Increment the task_count for the corresponding list_id in the lists table
      await pool.query(
        "UPDATE lists SET task_count = task_count + 1 WHERE list_id = $1",
        [finalListId]
      );

      // Commit the transaction
      pool.query("COMMIT", (commitErr) => {
        if (commitErr) {
          console.error("Error committing transaction:", commitErr);
          res
            .status(500)
            .json({ error: "Internal server error when committing" });
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

const getTasksFromListName = (req: Request, res: Response): void => {
  const list_name = req.params.listname;

  pool.query(
    `SELECT * FROM tasks WHERE list_name = $1 `,
    [list_name],
    (err, result) => {
      if (err) {
        console.error("Error retrieving tasks for this list name:", err);
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
    "SELECT * FROM tasks WHERE list_id = $1 AND DATE(due_datetime) = $2",
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
  const listId = req.params.list_id;

  pool.query(
    "SELECT * FROM tasks WHERE list_id = $1 AND DATE(due_datetime) = $2",
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
    "SELECT * FROM tasks WHERE status = $1 AND DATE(due_datetime) = $2",
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
    "SELECT * FROM tasks WHERE list_id = $1 AND DATE(due_datetime) = $2",
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
const getAllTasks = (req: Request, res: Response): void => {
  pool.query("SELECT * FROM tasks ", (err, result) => {
    if (err) {
      console.error("Error retrieving tasks for today:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    const tasks = result.rows;
    res.status(200).json(tasks);
  });
};

export const deleteTask = (req: Request, res: Response): void => {
  const taskId = req.params.task_id;
  pool.query(
    "DELETE FROM tasks WHERE task_id = $1",
    [taskId],
    (err, result) => {
      if (err) {
        console.error("Error deleting this task:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      if (result.rowCount === 0) {
        res.status(404).json({ error: "Task not found" });
        return;
      }

      res.status(200).json({ message: "Task deleted successfully" });
    }
  );
};

export {
  createTask,
  getTasksFromListName,
  getTasksForToday,
  getTasksForDate,
  getTasksForListAndToday,
  getTasksForListAndDate,
  getCompletedTasksForToday,
  getCompletedTasksForDate,
  getAllTasks,
};
