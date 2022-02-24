// Users Controller defines the responses to HTTP requests
// interacting with the profiles/user postgres database.

import { Pool, Client } from "pg";

const pool = new Pool({ // local 
  // Postgres Wrapper configuration
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  // user: process.env.POSTGRES_USER,
  // host: "localhost",
  // database: "profiles",
  // password: process.env.POSTGRES_PASSWORD,
  // port: 5432,
});

export default class UsersController {
  // Returns a list of all users
  static getUsers = async (_req, res) => {
    try {
      pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
        if (error) {
          res.status(400).json({ error });
        }
        res.status(200).json(results.rows);
      });
    } catch (e) {
      res.status(500).json({ e });
    }
  };

  // Returns a single user by their given unique ID
  static getUserById = async (req, res) => { 
    const id = parseInt(req.params.id); 
    // TODO: check here if user is actually user
    // Get token here to extract user field (check either req or res)
    pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
      if (error) {
        res.status(400).json({ error });
      }
      res.status(200).json(results.rows);
    });
  };

  // Creates a single user with required parameters:
  // name [string], email [string], uphill_max [int], downhill_max [int],
  // avoid_curbs [bool]
  static createUser = async (req, res) => {
    // TODO: get user from token in req or res
    // 1) enforce uniqueness constraint of user id column 
    // 2) (SELECT ... WHERE)
    try {
      const { name, email, uphill_max, downhill_max, avoid_curbs } = req.body;
      pool.query( // TODO: don't hardcode attributes
        "INSERT INTO users " + 
          "(name, email, uphill_max, downhill_max, avoid_curbs) " +
          "VALUES ($1, $2, $3, $4, $5)",
        [name, email, uphill_max, downhill_max, avoid_curbs],
        (error, _results) => {
          if (error) {
            res.status(400).json({ error });
          }
          res.status(201).send(`User ${name} added with ID: ${res.insertId}`);
        }
      );
    } catch (e) {
      res.status(500).json({ e });
    }
  };

  // Updates a single user with required parameters:
  // name [string], email [string], uphill_max [int], downhill_max [int],
  // avoid_curbs [bool]
  static updateUser = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { name, email, uphill_max, downhill_max, avoid_curbs } = req.body;

      pool.query(
        "UPDATE users SET name = $1, email = $2, " +
          "uphill_max = $3, downhill_max = $4, avoid_curbs = $5" +
          " WHERE id = $3",
        [name, email, uphill_max, downhill_max, avoid_curbs],
        (error, _results) => {
          if (error) {
            res.status(400).json({ error });
          }
          res.status(200).send(`User modified with ID: ${id}`);
        }
      );
    } catch (e) {
      res.status(500).json({ e });
    }
  };

  // Deletes a single user given their unique ID.
  static deleteUser = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      pool.query("DELETE FROM users WHERE id = $1", [id], (error, _results) => {
        if (error) {
          res.status(400).json({ error });
        }
        res.status(200).send(`User deleted with ID: ${id}`);
      });
    } catch (e) {
      res.status(500).json({ e });
    }
  };
}
