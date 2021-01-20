const express = require('express');
const router = express.Router();

//get todo list
// @GET
router.get('/', (req, res) => {
  res.send("Hello World!");
});

module.exports = router;
