const express = require("express");
const { connect, connection } = require("mongoose");
const cors = require("cors");

const { DB, REQUEST_TIMEOUT } = require("./config")
const PORT = 5000;

connect(DB)
connection.once('connected', () => {
  console.log('Connected to database');
});

const app = express();

app.use(cors());
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Server running...");
})
app.use("/api", require("./routes"))

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})
