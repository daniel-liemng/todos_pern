const express = require("express");
const cors = require("cors");

const pool = require("./db");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// ** ROUTES

// create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    // const newTodo = await pool.query(
    //   "INSERT INTO todo (description) VALUES($1)",
    //   [description],
    // );

    const newTodo = await pool.query(
      `INSERT INTO todo (description) VALUES('${description}') RETURNING *`,
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");

    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await pool.query(`SELECT * FROM todo WHERE todo_id = ${id}`);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updateTodo = await pool.query(
      `UPDATE todo SET description = '${description}' WHERE todo_id = ${id} RETURNING *`,
    );

    res.json(updateTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTodo = await pool.query(
      `DELETE FROM todo WHERE todo_id = ${id}`,
    );

    res.json("Deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
