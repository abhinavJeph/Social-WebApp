const express = require("express");
const PORT = process.env.PORT || 8000;
const expressEjsLayouts = require("express-ejs-layouts");
const app = express();

// use static files from assets
app.use(express.static("./assets"));

// This should be before routes
app.use(expressEjsLayouts);
app.set("expres layouts", true);
// Extract style and scripts from sub pages
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

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
