const express = require("express");

const router = express.Router();

router.get("/",function(req,res){

    res.send("Auth Route");

});

module.exports = router;