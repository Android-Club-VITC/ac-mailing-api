require("dotenv").config();
const path = require("path");
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

app.get("/static/image/:file",(req,res)=> {
	try {
		const {file} = req.params
		res.sendFile(path.join("assets",file),{root: __dirname});
	} catch(e) {
		console.log(e);
		res.status(400).send();
	}
});

//app.use('/api/newsletter',newsletterRoute);

app.use("*", (req, res) => {
  console.log("here");
  res.status(400);
  res.send();
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening at port ${port}`));
