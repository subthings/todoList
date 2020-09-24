const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))
app.set("view engine", "ejs")

const todoList = [];

app.get("/", (req, res) => {
    
    res.render("list", {weekDay: date.getDate(), todoList: todoList});
})

app.post("/", (req, res) => {
    todoList.push(req.body.todoItem);
    res.redirect("/");
})

function isWeekend(day) {
    if (day in [6, 0]) {
        return "Weekend";   
    }

    else return "Workday";
}

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})