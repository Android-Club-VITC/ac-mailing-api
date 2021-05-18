const express = require('express')
const mailHandler = require('./utilities/mailer.js')
require('dotenv').config();

const app = express()

app.use(express.json())

/*
	company name/individual
	email
	subject
	project details
	approx budget
	approx timeline
	other details 
*/

app.use('/api/sendmail',async (req,res)=>{
	try{
		const response = await mailHandler(req.body);
		if(response){
			console.log("email sent");
			res.send({status: response});
		}
		else{
			console.log("email not sent");
			res.status(400);
			res.send();
		}
	}
	catch(e){
		console.log(e);
		console.log("email not sent");
		res.status(500);
		res.send();
	}	
})

app.listen(3000,()=>console.log("listening on 3000"));

