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
        path: path.join(__dirname,"templates","git_commit.ejs"),
        attachments: [
            {
                filename: "git_event.ics",
                path: path.join(__dirname,"reminders","git_event.ics"),
                cid: "git_event"         
            }
        ]
    },

    "git-commit-conclude": {
        path: path.join(__dirname,"templates","git_commit_conclude.ejs"),
        filePath: path.join(__dirname,"certificates","git_committed"),
    },

    "revelation-register": {
        path: path.join(__dirname,"templates","revelation_register.ejs"),
        attachments: []
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