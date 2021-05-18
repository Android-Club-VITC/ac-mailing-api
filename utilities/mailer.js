var nodemailer = require('nodemailer');

const mailHandler = (data) => {
  
  const {company_name,sender_email,contact,project_details,approx_budget,approx_timeline,other_details} = data
  
  if(typeof company_name== "undefined" || typeof sender_email== "undefined" || typeof contact== "undefined" 
    || typeof project_details== "undefined" || typeof approx_budget== "undefined" 
    || typeof approx_timeline== "undefined" || typeof other_details== "undefined"){
    return false;
  }

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'androidclub@vit.ac.in',
      pass: process.env.PASSWORD
    }
  });

  const msg = `Company Name:- ${company_name}\n\nSender Mail:- ${sender_email}\n\nContact: ${contact}\n\nProject Details:- ${project_details}\n\nApprox Budget:- ${approx_budget}\n\nApprox Timeline:- ${approx_timeline}\n\nOther Details:- ${other_details}`
  
  var mailOptions = {
    from: sender_email,
    to: 'androidclub@vit.ac.in',
    subject: "Request for App Developnment",
    text: msg
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

module.exports = mailHandler