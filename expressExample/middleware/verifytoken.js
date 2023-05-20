const jwt = require("jsonwebtoken");

//const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"] || global.userToken;

  if (!token) {
    res.locals.result="public";
    //return res.status(403).send("A token is required for authentication");
    return next();
  }
  try {
    const decoded = jwt.verify(token, global.DB_token);
    req.user = decoded;
    res.locals.result=req.user.role;
    return next();
  } 
  catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;