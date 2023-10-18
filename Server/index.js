// To Import What are all the nessary thinks
const express = require('express');
const app = express();
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const AuthRouter = require('./router/AuthRouter');
const cookieParser = require('cookie-parser');
const compresser = require('compression');
const RateLimiter = require('express-rate-limit')
const cacheControl = require('express-cache-controller');
const GuestHouesData = require('./models/GuestHoues');
const bodyParser = require('body-parser');

const multer = require('multer');
// This is a policy for Security pursing used for URL passing data in different URL eg: backend runs in port 4000 
//but data passing to post 3000 so the port is different so
app.use(cors());
// This is only for Testing purpose if the server is running in the port or not4
// express json is the function to access the json data passed and access towords the FrontEnd to Backend and viceversa
app.use(express.json({ limit: '50mb' }));
//This is used to decode the data from the request example in form data is there any space the url will encode into '%20';
// to find this type of encrypted data and decrypt the data to normal values
// This is for to Route and Authendicate purpose
app.use(AuthRouter);
//This is for to Get the client browser cookie
app.use(cookieParser());
//This Below lines are very important for Server Security purpose
//{
    app.use(compresser());
//This is use to Control the request and boost up the server 

// To store the content is the user request and response what server gives 

//This is for to set a limitaion the request to the server its leeds to abuse the server
// Its prevent from the attack LIKE => DOS (Denial of services, API Scraping Attack)

//This is for MongoDB Atlas connection
mongoose.connect('mongodb+srv://ijaas:ijaas@cluster1.mthcgob.mongodb.net/?retryWrites=true&w=majority').then((res) => {
    console.log("Connected Database");
});
// To lishen the port number of PORT 4000 it is 
app.listen(PORT, (req, res) => {
    console.log('Server Running in port : ' + PORT);
});

