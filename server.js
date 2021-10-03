require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const mailRoute = require("./routes/mailRoute");
//const newsletterRoute = require("./routes/newsletterRoute");

app.use(express.json());
app.use(cors());

/*
	company name/individual
	email
	subject
	project details
	approx budget
	approx timeline
	other details 
*/

app.use("/api/mail", mailRoute);

//app.use('/api/newsletter',newsletterRoute);

app.use("*", (req, res) => {
  console.log("here");
  res.status(400);
  res.send();
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening at port ${port}`));
