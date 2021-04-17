const express = require("express");
const PORT = process.env.PORT || 8000;
const app = express();

app.use("/", require("./routes/index"));

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error in loading the server : ${err}`);
    return;
  }
  console.log(`Server is up and running on PORT : ${PORT}`);
});
