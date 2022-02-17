import { Pool } from "pg";

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

export default class UsersController {
  static getUsers = async (_req, res) => {
    pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  };

  static getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  };

  static createUser = async (req, res) => {
    const { name, email, uphill_max, downhill_max, avoid_curbs } = req.body;

    pool.query(
      "INSERT INTO users " +
        "(name, email, uphill_max, downhill_max, avoid_curbs) " +
        "VALUES ($1, $2, $3, $4, $5)",
      [name, email, uphill_max, downhill_max, avoid_curbs],
      (error, _results) => {
        if (error) {
          throw error;
        }
        res
          .status(201)
          .send(`User ${name} added with ID: ${res.insertId}`);
      }
    );
  };

  static updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3",
      [name, email, id],
      (error, _results) => {
        if (error) {
          throw error;
        }
        res.status(200).send(`User modified with ID: ${id}`);
      }
    );
  };

  static deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    pool.query("DELETE FROM users WHERE id = $1", [id], (error, _results) => {
      if (error) { throw error; }
      res.status(200).send(`User deleted with ID: ${id}`);
    });
  };
}