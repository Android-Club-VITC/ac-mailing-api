const express = require('express');
const {subscribe_controller,unsubscribe_controller} = require('../utilities/newsletterController.js')

const router = express.Router();

router.post('/subscribe', async (req,res)=>{
	try{
		const response = await subscribe_controller(req.body);
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

router.post('/unsubscribe', async (req,res)=>{
	try{
		const response = await unsubscribe_controller(req.body);
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
