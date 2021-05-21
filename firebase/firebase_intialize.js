const fs = require('firebase-admin');

const serviceAccount = require('./key.js');

fs.initializeApp({
 credential: fs.credential.cert(serviceAccount)
});

module.exports = fs;