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
    },
    
    "git-commit": {
        path: path.join(__dirname,"templates","git_commit.html"),
        attachments: [
            {
                filename: "logo.png",
                path: path.join(__dirname,"assets","logo.png"),
                cid: "logo"
            }
        ]
    }
}

// {
//     filename: "git_logo.png",
//     path: path.join(__dirname,"assets","git_logo.png"),
//     cid: "git_logo"
// },
// {
//     filename: "git_bg.png",
//     path: path.join(__dirname,"assets","git_bg.png"),
//     cid: "git_bg"
// }

module.exports = data;