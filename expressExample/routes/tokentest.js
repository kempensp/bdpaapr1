var express = require('express');
var router = express.Router();
const auth = require("../middleware/verifytoken");



router.get("/", auth, (req, res) => {
  const result = res.locals.result;
  if(result=="admin"){
    res.send("You would have admin access");
  }
  else if (result=="employee")
  {
    res.send("You would have employee access");
  }
  else {
    res.send("You would have guest access");
  }
});

module.exports=router;