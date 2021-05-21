const express = require('express');
const mailHandler = require('../utilities/mailController.js');

const router = express.Router();

router.post('/sendmail',async (req,res)=>{
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

module.exports = router;