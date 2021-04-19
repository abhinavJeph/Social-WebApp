const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8000;
const expressEjsLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
// used for session cookie
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("./config/passport-local-strategy");

const mongoStore = require("connect-mongo")(session);

app.use(express.urlencoded());

app.use(cookieParser());

// use static files from assets
app.use(express.static("./assets"));

// This should be before routes
app.use(expressEjsLayouts);
app.set("expres layouts", true);
// Extract style and scripts from sub pages
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// mongo store is used to store the session cookie into db
app.use(
  session({
    name: "getSocial",
    // TODO change the secret before deployement in prooduction mode
    secret: "jinneMeraDilLutya Oho",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new mongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disable",
      },
      function (err) {
        console.log(err || "connect-mongo db setup OK");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.sentAuthenticatedUser);

// use express router
app.use("/", require("./routes/index"));

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error in loading the server : ${err}`);
    return;
  }
  console.log(`Server is up and running on PORT : ${PORT}`);
});
