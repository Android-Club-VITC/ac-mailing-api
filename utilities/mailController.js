const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
const { getEmailTransporter, mailOptions } = require("./mail_transporter");
const emailTemplates = require("../email_template");

const mailController = {
  requestApp(data) {
    const {
      company_name,
      sender_email,
      contact,
      project_details,
      approx_budget,
      approx_timeline,
      other_details,
    } = data;

    if (
      typeof company_name == "undefined" ||
      typeof sender_email == "undefined" ||
      typeof contact == "undefined" ||
      typeof project_details == "undefined" ||
      typeof approx_budget == "undefined" ||
      typeof approx_timeline == "undefined" ||
      typeof other_details == "undefined"
    ) {
      return false;
    }

    const msg = `Company Name:- ${company_name}\n\nSender Mail:- ${sender_email}\n\nContact: ${contact}\n\nProject Details:- ${project_details}\n\nApprox Budget:- ${approx_budget}\n\nApprox Timeline:- ${approx_timeline}\n\nOther Details:- ${other_details}`;

    mailOptions.to = "androidclub@vit.ac.in";
    mailOptions.subject = "Request for App Developnment";
    mailOptions.text = msg;

    return new Promise((resolve, reject) => {
      getEmailTransporter().sendMail(mailOptions, function (error, info) {
        if (error) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  },

  formFeedback({ template, to, subject, name, urlPath }) {
    const filePath = emailTemplates[template].path;
    let data = fs.readFileSync(filePath, "utf8");
    data = ejs.render(data, { name, path: urlPath });
    mailOptions.to = to;
    mailOptions.subject = subject;
    mailOptions.html = data;
    mailOptions.attachments = emailTemplates[template].attachments;

    return new Promise((resolve, reject) => {
      getEmailTransporter().sendMail(mailOptions, function (error, info) {
        if (error) {
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  },

  textEmail({ to, subject, text }) {
    let options = { ...mailOptions };
    options.to = to;
    options.subject = subject;
    options.text = text;

    return new Promise((resolve, reject) => {
      getEmailTransporter().sendMail(options, function (error, info) {
        if (error) {
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  },
};

module.exports = mailController;
