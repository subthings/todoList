const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")

const todoList = [];

app.get("/", (req, res) => {
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    const today = new Date();
    const day = today.toLocaleDateString("en-EU", options);

    res.render("list", {isWeekend: isWeekend(today.getDay()), weekDay: day, todoList: todoList});
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