const jwt = require("jsonwebtoken");

//create a function to check the token
function isAuthenticated(req, res, next) {
  console.log("in the authentication middleware function");
  //check the headers for the token
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    const theToken = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(theToken, process.env.TOKEN_SECRET);

    // console.log("the token", theToken);
    // console.log("the payload", payload);
    req.payload = payload;
    next();
  } else {
    res.status(403).json({ message: "no token present" });
  }
}

//export the function so we can use it on other files
module.exports = { isAuthenticated };
