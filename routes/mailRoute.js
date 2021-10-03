const express = require("express");
const mailController = require("../utilities/mailController.js");

const router = express.Router();

router.post("/appRequest", async (req, res) => {
  try {
    const response = await mailController.requestApp(req.body);
    if (response) {
      res.status(200).send();
    } else {
      res.status(400).send();
    }
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.post("/feedback", async (req, res) => {
  try {  
    const response = await mailController.formFeedback(req.body);
    if (response) {
      res.status(200).send();
    } else {
      res.status(400).send();
    }
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

module.exports = router;
