const express = require("express");
const bodyParser = require("body-parser");
const app = express();

let items = [
  "Sketch out Logo designs",
  "Snap and open on Design tool",
  "Design Logo",
];
let workItems = [];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function (req, res) {
  let today = new Date();
  let options = { weekday: "long", day: "numeric", month: "long" };
  let day = today.toLocaleDateString("en-us", options);

  res.render("index", { listofDay: day, newTodos: items });
});
app.post("/", (req, res) => {
  let item = req.body.todoName;
  if (item == "") {
    // alert("Input field must not be empty!");
  } else {
    if (req.body.list == "work day") {
      workItems.push(item);
      res.redirect("/work");
    } else {
      items.push(item);
      res.redirect("/");
    }
  }
});
app.get("/work", (req, res) => {
  res.render("index", { listofDay: "work day", newTodos: workItems });
  // workItems.push(item);
});

app.listen(5000, function () {
  console.log("app is running on port 5000");
});
