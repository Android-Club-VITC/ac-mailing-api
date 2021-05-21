const firebase_admin = require('firebase-admin');
const firebase = require('../firebase/firebase_intialize');
const nodemailer = require('nodemailer');
const path = require('path')

const controllers = {

	subscribe_controller: async ({email}) => {
		if(typeof email == 'undefined')
			return false;

		const firestore = firebase.firestore();
		const db_doc = await firestore.collection('newsletter_subscribed').doc(email).get();

		if(db_doc.exists){
			return false;
		}

		let res = await send_subscription_mail(email);
		if(!res) return false;

		res = await firestore.collection('newsletter_subscribed').doc(email).set({
			email: email 
		})
		
		return true;
	},

	unsubscribe_controller: async ({email}) => {
		if(typeof email == 'undefined')
			return false;

		const firestore = firebase.firestore();
		const db_doc = await firestore.collection('newsletter_subscribed').doc(email).get();

		if(!db_doc.exists){
			return false;
		}

		let res = await firestore.collection('newsletter_subscribed').doc(email).delete();
		res = await send_unsubscription_mail(email);
	
		return true;
	}
}


const send_subscription_mail = (email) => {
	var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'androidclub@vit.ac.in',
      pass: process.env.PASSWORD
    }
  });

  const msg = ``
  
  var mailOptions = {
    from: 'androidclub@vit.ac.in',
    to: email,
    subject: "Subscribed to the newsletter of Android Club",
    html: `<center> 
              <h2>Thank You for subscribing!</h2>
              <img src="cid:ac_logo"/>
              <a href="https://android-club-vitcc.web.app">Our website</a> 
           </center>`,
    attachments: [{
        filename: 'logo.png',
        path: path.join(__dirname,'..','assets','logo.png'),
        cid: 'ac_logo'
    }]
  };
  
  return new Promise((resolve,reject)=>{
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      resolve(false)
    } else {
      resolve(true)
    }
  });
  })
}

const send_unsubscription_mail = (email) => {
	var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'androidclub@vit.ac.in',
      pass: process.env.PASSWORD
    }
  });
  
  var mailOptions = {
    from: 'androidclub@vit.ac.in',
    to: email,
    subject: "Unsubscribed to the newsletter of Android Club",
    html: `<center> 
              <h2>You Have unsubscribed</h2>
              <img src="cid:ac_logo"/>
              <a href="https://android-club-vitcc.web.app">Our website</a> 
           </center>`,
    attachments: [{
        filename: 'logo.png',
        path: path.join(__dirname,'..','assets','logo.png'),
        cid: 'ac_logo'
    }]
  };
  
  return new Promise((resolve,reject)=>{
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      resolve(false)
    } else {
      resolve(true)
    }
  });
  })
}

module.exports = controllers;