const path = require("path");

const data = {
    "test": {
        path: path.join(__dirname,"templates","test.html"),
        attachments: [
            {
                filename: "logo.png",
                path: path.join(__dirname,"assets","logo.png"),
                cid: "logo"
            }
        ]
    }       
}

module.exports = data;