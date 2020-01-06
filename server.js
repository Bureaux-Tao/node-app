const express = require("express");
const mongoose = require("mongoose");
const app = express();

// body-parser中间件
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db config
const db = require("./config/keys").mongoURI;

//引入users.js
const users = require("./routes/api/users");

//引入profile.js
const profiles = require("./routes/api/profiles");

//passport init
const passport = require("passport");
app.use(passport.initialize());
require("./config/passport")(passport);

mongoose.set("useFindAndModify", false);
//connect to mongodb
mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log("1.mLab connected!"))
	.catch(err => console.log("2.mLab connect fail:" + err));

app.get("/", (req, res) => {
	res.send("Hello world");
});

//使用users
app.use("/api/users", users);
app.use("/api/profiles", profiles);

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log("3.server is running on port " + port);
});
