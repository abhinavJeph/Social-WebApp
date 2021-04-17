const express = require("express");
const PORT = process.env.PORT || 8000;
const ejs = require("ejs");
const app = express();

// use express router
app.use("/", require("./routes/index"));

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error in loading the server : ${err}`);
    return;
  }
  console.log(`Server is up and running on PORT : ${PORT}`);
});
