const jwt = require("jsonwebtoken");
const owner = require("../models/AdminSchema"); // Importing the model for user data
const AuthVerify = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    // If there's no authorization header in the request
    return res.status(401).json({ Error: "Authorization Failed" });
  }
  const token = authorization.split(" ")[1]; // Extract the JWT token from the header
  try {
    // Verify the JWT token using the secret key "Guest Security"
    const { _id } = jwt.verify(token, "Guest Security");
    // Fetch user data from the database based on the _id from the token
    req.user = await owner.findOne({ _id }).select("_id");
    next(); // Proceed to the next middleware or route if authentication is successful
  } catch (err) {
    // If there's an error during token verification or user retrieval
    console.log(err); // Log the error for debugging purposes
  }
};
module.exports = AuthVerify; // Export the middleware for use in other parts of the application
