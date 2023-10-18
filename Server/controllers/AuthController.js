const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const User = require("../models/UserSchema");
const owner = require("../models/AdminSchema");
const isEmail = require("validator/lib/isEmail");
const isStrongPassword = require("validator/lib/isStrongPassword");
const GuestHouseData = require("../models/GuestHoues");
const bodyParser = require("body-parser");
const Booking = require("../models/Booking");
// Here we will sign the token basically this token is TOKEN CONTAIN HEADER, PAYLOAD, DATA
// More information About JWT please visit
//https://jwt.io/
const createToken = (id) => {
  return jwt.sign({ id }, "Guest Security", {
    expiresIn: 60 * 60 * 24,
  });
};

module.exports.Login = async (req, res) => {
  const { Email, Password, types } = req.body;
  const reg = /^[0-9]*$/;
  if(reg.test(Email)){
    console.log("hii")
    const Num = await owner.findOne({ PhoneNumber:Email });
    //console.log(Num.Password);
    if(Num){
      const pass = await bcrypt.compare(Password, Num.Password);
      console.log(pass);
      if (pass) {
        const token = createToken(Num._id);
        return res.status(200).json({ Email, token, types, Name: Num.Name });
      } else {
        return res.status(401).json({ Error: "Invalided Password" });
      }
    }
    else{
      return res.status(401).json({ Error:"User Not Available" })
    }
  }
  if (!isEmail(Email)) {
    res.status(401).json({ Error: "Please enter the valid email" });
    return;
  }
  if (!isStrongPassword(Password)) {
    res.status(401).json({ Error: "Invalid Password" });
    return;
  }
  const Finds = await User.findOne({ Email: Email });
  if (Finds) {
    const pass = await bcrypt.compare(Password, Finds.Password);
    if (pass) {
      const token = createToken(Finds._id);
      return res
        .status(200)
        .json({
          Email,
          Name: Finds.Name,
          PhoneNumber: Finds.PhoneNumber,
          token,
          types,
        });
    } else {
      return res.status(401).json({ Error: "Invalided Password" });
    }
  } else {
    res.status(401).json({ Error: "User Not Available please signin" });
  }
};
// this the user sign up module to signup
module.exports.Signup = async (req, res) => {
  const { Email, Password, Name, PhoneNumber, types } = req.body;
  const FindUser = await User.findOne({ $or:[ {Email: Email},{PhoneNumber:PhoneNumber}] });
  if (FindUser) {
    return res.status(400).json({ Error: "User already Exists" });
  } else {
    try {
      const user = await User.create({ Name, Email, PhoneNumber, Password });
      const token = createToken(user._id);
      res.status(200).json({ Email, Name, token });
    } catch (err) {
      if (err.name === "ValidationError") {
        //this will give the first error occur in the data does not match in schema
        const firstErrorField = Object.keys(err.errors)[0];
        const errorMessage = err.errors[firstErrorField].message;
        // Send the validation errors as a JSON response
        return res.status(401).json({ Error: errorMessage });
      }
    }
  }
};


module.exports.OwnerLogin = async (req, res) => {
  const { Email, Password, types } = req.body;
  const reg = /^[0-9]*$/;
  if(reg.test(Email)){
    console.log("hii")
    const Num = await owner.findOne({ PhoneNumber:Email });
    //console.log(Num.Password);
    if(Num){
      const pass = await bcrypt.compare(Password, Num.Password);
      console.log(pass);
      if (pass) {
        const token = createToken(Num._id);
        return res.status(200).json({ Email, token, types, Name: Num.Name });
      } else {
        return res.status(401).json({ Error: "Invalided Password" });
      }
    }
    else{
      return res.status(401).json({ Error:"User Not Available" })
    }
  }
  if (!isEmail(Email)) {
    res.status(401).json({ Error: "Please enter the valid email" });
    return;
  }
  if (!isStrongPassword(Password)) {
    res.status(401).json({ Error: "Invalid Password" });
    return;
  }
  const Finds = await owner.findOne({ Email: Email });
  if (Finds) {
    const pass = await bcrypt.compare(Password, Finds.Password);
    if (pass) {
      const token = createToken(Finds._id);
      var n = Finds.Name;
      return res.status(200).json({ Email, token, types, Name: n });
    } else {
      res.status(401).json({ Error: "Invalided Password" });
      return;
    }
  } else {
    res.status(401).json({ Error: "Owner Not Available please signin" });
  }
};
module.exports.OwnerSignup = async (req, res) => {
  const { Email, Password, Name, PhoneNumber, types } = req.body;
  const FindUser = await owner.findOne({ $or:[ {Email: Email},{PhoneNumber:PhoneNumber}]});
  if (FindUser) {
    return res.status(400).json({ Error: "User already Exists" });
  } else {
    try {
      const user = await owner.create({ Name, Email, PhoneNumber, Password });
      const token = createToken(user._id);
      res.status(200).json({ Email, Name, token, types });
    } catch (err) {
      if (err.name === "ValidationError") {
        //this will give the first error occur in the data does not match in schema
        const firstErrorField = Object.keys(err.errors)[0];
        const errorMessage = err.errors[firstErrorField].message;
        // Send the validation errors as a JSON response
        return res.status(401).json({ Error: errorMessage });
      }
    }
  }
};
app.use(bodyParser.json({ limit: "500mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "500mb",
    parameterLimit: 100000,
  })
);

module.exports.HouseData = async (req, res) => {
  const {
    HouseImg,
    OwnerName,
    Address,
    MaxGuest,
    Room,
    Kitchen,
    RentAmount,
    LimitDays,
    OwnerEmail,
  } = req.body;
  try {
    const guestHouseData = new GuestHouseData({
      OwnerEmail,
      OwnerName,
      MaxGuest,
      Room,
      Kitchen,
      RentAmount,
      LimitDays,
      Address,
      HouseImg,
    });

    await guestHouseData.save();
    return res.status(200).json({
      GuestHouseData: guestHouseData,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const firstError = Object.keys(err.errors)[0];
      const errorMsg = err.errors[firstError].message;
      return res.status(400).json({ Error: errorMsg });
    } else {
      console.error(err);
      return res.status(500).json({ Error: "Internal server error" });
    }
  }
};

module.exports.getguesthouse = async (req, res) => {
  const { id } = req.params;
  const OwnerData = await GuestHouseData.find({ OwnerEmail: id });
  if (OwnerData) {
    res.status(200).json({ Data: OwnerData });
  } else {
    res.json({ Message: "No user" });
  }
};

module.exports.getallhouse = async (req, res) => {
  const Data = await GuestHouseData.find({});
  res.status(200).json({ HouseDatas: Data });
};

module.exports.Delete = async (req, res) => {
  const { id } = req.params;
  const Deletes = await GuestHouseData.deleteOne({ _id: id });
  if (Deletes) {
    return res.status(200).json({ Deleted: "Successfully Deleted" });
  }
};

module.exports.Edits = async (req, res) => {
  const { Id, Room, LimitDays, Kitchen, Amount } = req.body;
  if (
    Id == "" ||
    Room == "" ||
    LimitDays == "" ||
    Kitchen == "" ||
    Amount == ""
  ) {
    return res.status(401).json({ Error: "Please Enter all the Fields" });
  } else {
    try {
      const Update = await GuestHouseData.updateOne(
        { _id: Id },
        {
          $set: {
            Room: Room,
            LimitDays: LimitDays,
            Kitchen: Kitchen,
            RentAmount: Amount,
          },
        }
      );
      if (Update) {
        return res.status(200).json({ Success: "Successfully updated" });
      }
    } catch (err) {
      return res.status(401).json({ Error: "Somthing went wrong" });
    }
  }
};

module.exports.Book = async (req, res) => {
  const { UserData, FromDate, ToDate, OwnerId } = req.body;
  const overlappingReservations = await Booking.find({
    OwnerId,
    $or: [
      {
        $and: [
          { FromDate: { $lte: FromDate } },
          { ToDate: { $gte: FromDate } },
        ],
      },
    ],
  });
  if (overlappingReservations.length > 0) {
    return res
      .status(400)
      .json({ Error: "House is already booked for the selected date range." });
  }

  const book = Booking.create({
    OwnerId: OwnerId,
    UserName: UserData.Name,
    UserEmail: UserData.Email,
    PhoneNumber: UserData.PhoneNumber,
    FromDate: FromDate,
    ToDate: ToDate,
  });

  return res.status(200).json({ book });
};


module.exports.GetBooking = async(req, res) => {
  const { Email } = req.body;
  const ShowBook = await Booking.find({UserEmail:Email});
  return res.status(200).json({ ShowBook });
}