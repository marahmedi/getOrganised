// authController.ts

import { Request, Response } from 'express';
import {pool} from '../app'; // Assuming you have a database connection pool set up

interface User {
  user_id: number;
  firstname: string;
  lastname: string
  password: string;
}

const loginUser = (req: Request, res: Response): void => {
  const { email, password } = req.body;

  // Check if user with provided username exists
  pool.query<User>('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password], (err, result) => {
    if (err) {
      console.error('Error checking user:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    const user = result.rows[0];
    console.log(user);

    if (!user) {
      res.status(401).json({ error: 'Email or password is incorrect' });
      return;
    }

    // Respond with user details or a success message
    res.status(200).json({ message: 'Login successful', user });

    
  });
};

const newUser = (req: Request, res: Response): void => {
    const { firstname, lastname, email, password } = req.body;

      // Insert the new user into the database
      pool.query(
        'INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)',
        [firstname, lastname, email, password],
        (queryErr) => {
          if (queryErr) {
            console.error('Error creating new user:', queryErr);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
          res.status(200).json({ message: 'User created successfully' });
        }
      );
  };

export { loginUser, newUser };
