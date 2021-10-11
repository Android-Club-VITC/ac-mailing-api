const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GCP_CLIENT_ID, // Client ID
  process.env.GCP_CLIENT_SECRET, // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

const getAccessToken = () => {
  oauth2Client.setCredentials({
    refresh_token: process.env.GCP_AUTH_RF,
  });
  const accessToken = oauth2Client.getAccessToken();
  return accessToken;
};

const mailOptions = {
  from: "team.ac.vitc@gmail.com",
  generateTextFromHTML: true,
};

function getEmailTransporter() {
  const accessToken = getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "androidclub@vit.ac.in",
      clientId: process.env.GCP_CLIENT_ID,
      clientSecret: process.env.GCP_CLIENT_SECRET,
      refreshToken: process.env.GCP_AUTH_RF,
      accessToken: accessToken,
    },
  });
  return smtpTransport;
};

module.exports = {
  mailOptions,
  getEmailTransporter
}