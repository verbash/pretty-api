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
// req.body - https://www.geeksforgeeks.org/express-js-req-body-property/ *Updated to accept multiple parameters* 
app.post("/punk", async (req, res) => {
    try {
        console.log(req.body);
        const data = req.body;
        const newPunk = await pool.query(
            "INSERT INTO punks (punk, rarity, cosplay, img, thumb, token_series_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
        [data.punk, data.rarity, data.cosplay, data.img, data.thumb, data.token_series_id]
        );

        res.json(newPunk.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//GET ALL PUNKS
app.get("/punk", async (req, res) => {
    try {
        const allPunks = await pool.query("SELECT * FROM punks");
        res.json(allPunks.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//GET A PUNK - to-do
app.get("/punk/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const apunk = await pool.query("SELECT * FROM punks WHERE punks_id = $1", [id]);
        res.json(apunk.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//UPDATE A PUNK
app.put("/punk/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updatePunks = await pool.query("UPDATE punks SET description = $1 WHERE punks_id = $2", 
        [description, id]);
        res.json("Punk was updated");
    } catch (err) {
        console.error(err.message);
    }
})
//DELETE A PUNK

app.delete("/punk/:id", async(req, res)=>{
    try {
        const { id } = req.params;
        const { description } = req.body;
        const deletePunk = await pool.query("DELETE FROM punks WHERE punks_id = $1", 
        [id]);
        res.json("Punk was deleted");
    } catch (err) {
        console.error(err.message);
    }
})