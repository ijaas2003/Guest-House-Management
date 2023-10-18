const mongoose = require('mongoose');
const { isInt, isEmail, isAlpha, isAlphanumeric } = require('validator')
const date = new Date();
const GuestHouse = new mongoose.Schema({
    OwnerEmail:{
        type: String,
        required:[ true, "Please Enter the Email"],
        validate:[ isEmail, "Please Enter the valid email"],
    },
    OwnerName: {
        type: String,
        required : [true, "Please Enter the Name"],
        validate: [isAlpha, "Please Enter the valid Name"]
    },
    
    MaxGuest:{
        type:String,
        required:[true, "Please enter the Max Guest live"],
        validate:[isInt, "Please enter the valid" ]
    },
    Room:{
        type:String,
        required:[true, "Please enter the Max room available"],
        validate:[isInt, "Please enter the valid number" ]
    },
    Kitchen:{
        type:String,
        required:[true, "Please enter the Max kitchen live"],
        validate:[isInt, "Please enter the valid" ]
    },
    RentAmount:{
        type:String,
        required:[true, "Please enter the Rent Amount"],
        validate:[isInt, "Please enter the valid Amount"]
    },
    LimitDays:{
        type:String,
        required:[true, "Please enter the Max days may live"],
        validate:[isInt, "Please enter the valid Days" ]
    },
    Address:{
        type: String,
        required : true,
    },
    HouseImg:{
        type:[String],
        required:true
    },
    FromDate: {
        type: Date,
        default: date // Set the default value to the current date
    },
    ToDate: {
        type:Date,
        default: date // Set the default value to the current date
    }
});



const GuestHouseData = mongoose.model("GuestHouesData",GuestHouse);
module.exports = GuestHouseData;