const express = require("express")
const app = express()
const mysql = require("mysql2")
const bodyParser = require('body-parser');
const cors = require("cors")

//middleware
const corsOption = {origin : ["http://localhost:5173"]}
app.use(bodyParser.json());
app.use(cors(corsOption))

const PORT = 8000

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "todolistdb"
}).promise()


//show Notes
app.get("/api", async (req, res)=>{
    const [tasks] = await connection.query("SELECT * FROM `ToDoList`")
    res.send(tasks);
})

//post Notes
app.post('/api/todo', async (req, res) => {
    const { task, isDone } = req.body;
    await connection.query('INSERT INTO ToDoList (task, isDone) VALUES (?, ?)', [task, isDone]);
    res.send('note posted');
});

//delete Note by id
app.delete('/api/todo/:id', async (req, res) => {
    const { id } = req.params;
    await connection.query('DELETE FROM ToDoList WHERE id = ?', [id]);
    res.send('note deleted');
  });




app.listen(PORT, ()=>{
    console.log(`Server started: ${PORT}`)
})