const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

app.listen(5000, () => {
    console.log("server has started on port 5000");
});

//ROUTES

//CREATE A PUNK - will need to update to add authentication
app.post("/punk", async (req, res) => {
    try {
        console.log(req.body);
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO punks (punk, rarity, cosplay, img, thumb, token_series_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
        [description]
        );

        res.json(newTodo.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//GET ALL PUNKS
app.get("/todos", async (req, res) => {
    try {
        const allPunks = await pool.query("SELECT * FROM todo");
        res.json(allPunks.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//GET A PUNK - to-do
// app.get("/punks/:id", async (req, res) => {
//     try {
//         console.log(req.params);
//         const { id } = req.params;
//         const todo = await pool.query("SELECT * FROM todo WHERE punk_id = $1", [id]);
//         res.json(todo.rows);
//     } catch (err) {
//         console.error(err.message);
//     }
// })

//UPDATE A PUNK

//DELETE A PUNK

