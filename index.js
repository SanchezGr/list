var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

var task = ["Опанувати JavaScript", "Опанувати Node.js"];
var complete = ["Опанувати HTML та CSS", "Опанувати Git та GitHub"];

app.get("/", function (req, res) {
    res.render("index", { task: task, complete: complete });
});

app.post("/addnewtask", function (req, res) {
    var newTask = req.body.newtask;

    if (newTask && newTask.trim() !== "") {
        task.push(newTask.trim());
    }

    res.redirect("/");
});

app.post("/movetocompletetask", function (req, res) {
    var completeTask = req.body.check;

    if (typeof completeTask === "string") {
        complete.push(completeTask);
        task.splice(task.indexOf(completeTask), 1);
    } else if (Array.isArray(completeTask)) {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }

    res.redirect("/");
});

app.listen(3000, function () {
    console.log("Сервер працює на http://localhost:3000/");
});