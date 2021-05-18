const express = require('express')
const mailHandler = require('./utilities/mailer.js')
const cors = require('cors')
const app = express()


app.use(express.json())
app.use(cors())

/*
	company name/individual
	email
	subject
	project details
	approx budget
	approx timeline
	other details 
*/

app.post('/api/sendmail',async (req,res)=>{
	try{
		const response = await mailHandler(req.body);
		if(response){
			res.send({status: response});
		}
		else{
			res.status(400);
			res.send();
		}
	}
	catch(e){
		console.log(e);
		res.status(500);
		res.send();
	}	
})

app.use('*',(req,res)=>{
	res.status(400);
	res.send();
})

const port = process.env.PORT || 3000 

app.listen(port,()=>console.log(`Listening at port ${port}`));

