const mongoose  = require("mongoose");

const BookingDetails = new mongoose.Schema({
    OwnerId:String,
    UserName:String,
    UserEmail:String,
    PhoneNumber:String,
    FromDate:String,
    ToDate:String
});

const Booking = mongoose.model("Booking", BookingDetails);
module.exports = Booking;