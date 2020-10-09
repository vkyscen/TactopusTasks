const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
var http = require("http").Server(app);
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require('body-parser')
var slots = require("./models/model");
var downloader = require("./models/user")

app.use(cors());
 
app.use(bodyParser.json());
app.use(morgan("dev"));

// DB stuff
const mongoose = require("mongoose");
const db = require("./setup/myurl").Mongourl;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("mongo connection error " + err));

//server
const server = http.listen(port, () => {
  console.log(`App is running at port ${port}`);
});

//demo route
app.get("/", (req, res) => {
  // res.sendStatus(200);s
  res.send("paltu verithanam");
});

//dislplay open slots
app.get("/openslots", (req, res) => {

  slots.find({ isSlotBooked: "FALSE", status: "active" },"-_id")
    .then((d) => {
      console.log(d);
      res.json(d);
    })
    .catch((err) => console.log(err));
});

//book a slot                              | url param -> slotUID
app.post("/bookslot/:slotUID", (req, res) => {
  slots.findOneAndUpdate({ slotUID: req.params.slotUID }, {
    isSlotBooked: "TRUE",
    caretakerID: req.body.caretakerID,
    caretakerName: req.body.caretakerName

  },{new: true})
    .then((d) => {
      console.log(d);
      res.json(d);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

//delete a slot
app.get("/deleteslot/:slotUID", (req, res) => {
  slots.findOneAndUpdate({ slotUID: req.params.slotUID }, {   
    status: "deleted"
  },{new: true})
    .then((d) => {
      console.log(d);
      res.json(d);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});
