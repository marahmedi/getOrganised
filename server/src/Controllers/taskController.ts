import { Request, Response } from "express";
import { pool } from "../app";

interface CustomRequest extends Request {
  user?: string;
}

// Get today's date in YYYY-MM-DD format
const todayDate = new Date().toISOString().split("T")[0];

const createTask = async (req: Request, res: Response): Promise<void> => {
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

  try {
    await pool.query("BEGIN");

    let finalListId: number;

    if (list_id) {
      // Use the provided list_id
      finalListId = list_id;
    } else if (list_name) {
      // Create a new list if list_name is provided
      const newListResult = await pool.query(
        "INSERT INTO lists (list_name, user_id) VALUES ($1, $2) RETURNING list_id",
        [list_name, user_id]
      );

      finalListId = newListResult.rows[0].list_id;
    } else {
      // Return an error if neither list_id nor list_name is provided
      await pool.query("ROLLBACK");
      res
        .status(400)
        .json({ error: "Either list_id or list_name must be provided" });
      return;
    }

    // Insert the new task into the database using the finalListId
    const newTaskResult = await pool.query(
      "INSERT INTO tasks (task_name, start_time, end_time, status, list_name, list_id, task_date, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        task_name,
        start_time,
        end_time,
        false,
        list_name,
        list_id,
        task_date,
        notes,
      ]
    );

    await pool.query("COMMIT");

    res.status(201).json(newTaskResult.rows[0]);
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error creating new task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTasksForToday = async (req: CustomRequest, res: Response) => {
  try {
    // Extract user ID from the request set by the middleware
    const userId = req.user;

    // Fetch the username for the user
    const userResult = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [userId]
    );
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const username = userResult.rows[0].user_name;

    // Fetch the list IDs for the user
    const listResult = await pool.query(
      "SELECT list_id FROM lists WHERE user_id = $1",
      [userId]
    );
    if (listResult.rows.length === 0) {
      return res.status(404).json({ error: "No lists found for the user" });
    }
    const listIds = listResult.rows.map((row) => row.list_id);

    // Get today's date in the required format
    const todayDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

    // Fetch tasks for today's date and the list IDs
    const tasksResult = await pool.query(
      "SELECT * FROM tasks WHERE task_date = $1 AND list_id = ANY($2::int[])",
      [todayDate, listIds]
    );

    const tasks = tasksResult.rows;

    // Send the response with username and tasks
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error retrieving tasks for today:", err);
    res.status(500).json({ error: "Internal server error" });
  }
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

const getAllTasks = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    // Extract user ID from the request set by the middleware
    const userId = req.user;

    // Fetch the list IDs for the user
    const listResult = await pool.query(
      "SELECT list_id FROM lists WHERE user_id = $1",
      [userId]
    );
    if (listResult.rows.length === 0) {
      res.status(404).json({ error: "No lists found for the user" });
      return;
    }
    const listIds = listResult.rows.map((row) => row.list_id);

    const result = await pool.query(
      "SELECT * FROM tasks where list_id = ANY($1::int[])",
      [listIds]
    );
    const tasks = result.rows;

    // Send the response with username and tasks
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error retrieving tasks:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteTask = (req: Request, res: Response): void => {
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
  deleteTask,
};
