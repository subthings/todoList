const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

const dbName = "todoListDB";
const mongoUrl = "mongodb://localhost/" + dbName;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))
app.set("view engine", "ejs")

mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true});

const todoItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add your todo"]
    }
});

const TodoItem = mongoose.model("TodoItem", todoItemSchema);

app.get("/", (req, res) => {
    TodoItem.find((err, list) => {
        if (err) {
            console.log(err);
        } else {
            res.render("list", {weekDay: date.getDate(), todoList: list});
        }
    })
})

app.post("/", (req, res) => {
    const todoItem = new TodoItem({
        name: req.body.todoItem
    })
    todoItem.save()
    res.redirect("/");
})

app.post("/delete", (req, res) => {
    const id = req.body.deleteItem;
    TodoItem.findByIdAndRemove(id, (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.redirect("/");
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})