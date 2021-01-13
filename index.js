var express = require("express");
var mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

var bodyParser = require("body-parser");

var app = express();

app.use(cookieParser());
app.use("/asset",express.static("./assets"));

var mongo = mongoose.connect('mongodb://localhost:27017/jwt', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});


app.set("view engine","ejs");

//get the application/json data 
var json = bodyParser.json();

//get teh applicxation/url-encoded-data
var urlencoded = bodyParser.urlencoded({ extended: false })


require("./routes/route")(app,mongo,json,urlencoded);


app.listen(3000,()=>{console.log("listening on port 3000")});
