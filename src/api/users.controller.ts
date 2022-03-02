// Users Controller defines the responses to HTTP requests
// interacting with the postgres database.

import { Pool } from "pg";

const table_name = "profile";
const pool = new Pool({ // local 
  // Postgres Wrapper configuration
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  // user: process.env.POSTGRES_USER, // for debug mode only
  // host: "localhost",
  // database: "profiles",
  // password: process.env.POSTGRES_PASSWORD,
  // port: 5432,
});

export default class UsersController {
  // Returns a list of all users
  static getUsers = async (_req, res) => {
    try {
      pool.query("SELECT * FROM " + table_name + " ORDER BY user_id ASC",
      (error, results) => {
        if (error) {
          const msg = error.message;
          res.status(400).json({ msg });
        } else if (results) {
          res.status(200).json(results.rows);
        }
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
    pool.query("SELECT * FROM " + table_name + " WHERE user_id = $1", [id],
    (error, results) => {
      if (error) {
        const msg = error.message;
        res.status(400).json({ msg });
      } else if (results) {
        res.status(200).json(results.rows);
      }
    });
  };

  // Creates a single user with required parameters:
  // avoid_curbs [bool]
  static createUser = async (req, res) => {
    try {
      const { user_id, uphill_max,  downhill_max, avoid_curbs } = req.body;
      pool.query( // TODO: don't hardcode attributes
        "INSERT INTO " + table_name + " (user_id, uphill_max,  downhill_max, avoid_curbs) " + 
        " VALUES ($1, $2, $3, $4) ON CONFLICT (user_id) DO UPDATE" + 
        " SET uphill_max=$2, downhill_max=$3, " + 
         " avoid_curbs=$4 WHERE " + table_name + ".user_id=$1",
        [user_id, uphill_max,  downhill_max, avoid_curbs],
        (error, results) => {
          if (error) {
            const msg = error.message;
            res.status(400).json({ msg });
          } else {
            res.status(201).send(`User upserted with id ${user_id}, ${results.rows}`);
          }
        }
      );
    } catch (e) {
      res.status(500).json({ e });
    }
  };

  // Updates a single user with required parameters:
  // avoid_curbs [bool]
  static updateUser = async (req, res) => {
    try {
      const id = req.params.id;
      const { uphill_max,  downhill_max, avoid_curbs } = req.body;

      pool.query(
        "UPDATE " + table_name + " SET uphill_max=$1, downhill_max=$2, " + 
         " avoid_curbs=$3 WHERE user_id=$4",
        [uphill_max, downhill_max, avoid_curbs, id],
        (error, results) => {
          if (error) {
            const msg = error.message;
            res.status(400).json({ msg });
          } else {
            res.status(200).send(`${results.rows}`);
          }
        }
      );
    } catch (e) {
      res.status(500).json({ e });
    }
  };

  // Deletes a single user given their unique ID.
  static deleteUser = async (req, res) => {
    try {
      const id = req.params.id;
      pool.query("DELETE FROM " + table_name + " WHERE user_id = $1", [id],
      (error, _results) => {
        if (error) {
          const msg = error.message;
          res.status(400).json({ msg });
        } else {
          res.status(200).send(`User deleted with ID: ${id}`);
        }
      });
    } catch (e) {
      res.status(500).json({ e });
    }
  };
}
