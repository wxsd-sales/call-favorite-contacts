const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 3000;
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());

// Read data from the JSON file
function readData() {
  const data = fs.readFileSync("data.json");
  return JSON.parse(data);
}

// Write data to the JSON file
function writeData(data) {
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
}

// Get all items
app.get("/data", (req, res) => {
  const data = readData();
  res.json(data.data);
});

//get value by using name and key
app.get("/data/:email", (req, res) => {
  const data = readData();
  const email = req.params.email;
  console.log("body", req.params);
  const item = data.data.find((item) => item.email === email);

  if (item) {
    let value = item;
    res.json({ data: value });
  } else {
    res.status(404).send("Item not found.");
  }
});

app.post("/data/:email", (req, res) => {
  let data = readData();
  const email = req.params.email;
  const time = req.body.time;
  console.log(time);

  const itemIndex = data.data.findIndex((item) => item.email === email);
  console.log(itemIndex);

  if (itemIndex !== -1) {
    console.log(data.data[itemIndex].timeInSec);
    data.data[itemIndex].timeInSec = time;
    writeData(data);
    res.json(data.data[itemIndex]);
  } else {
    res.status(404).send("Item not found.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
