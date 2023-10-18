// this is the material ui components
// visit https://mui.com/material-ui/ this link to know more
import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ImageList,
  ImageListItem,
  Stack,
  TextField,
} from "@mui/material";
// this is the import all the image used inside the folder constants 
import { Images } from "../Constants/images";
// this is useEffect and useState import 
import { useEffect, useState } from "react";
// this is the datejs import 
// this is used to calculate and manpulation on the date we need
import dayjs from "dayjs";
//  here is al the component is imported from MUI 
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
// this is the Usecontext Api reducer function to handle the data
import { useAuthContext } from "../hooks/useAuthContext";
// this is the react toastify a beautifull custom msg
import { toast } from "react-toastify";
// this is the Icons from MUI
import { Bed, Kitchen } from "@mui/icons-material";
// axios is the API is used to handle the RESTAPI TO comunicate from frontend to backend very effectivelyy
import axios from "axios";
const Home = () => {
  // this is style as you know used for the background image 
  const Styles = {
    backgroundImage: `url(${Images.Bg2})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
    backgroundColor: "#0a0a27",
  };
  // this is the useContext Api to take the date in the use state
  const { user } = useAuthContext();
  //this is range the calender gives we asign this startDate and endDate to find the range of the booking  
  const [range, setRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  // this are all the state I used inside this component
  // this is used to send handle the if the user need to see the images it help to open the dialog box see line 249
  const [onOpen, setonOpen] = useState(false);
  // this state aree handleing the inputs
  const [Guest, setGuest] = useState("");
  const [housess, sethouses] = useState("");
  const [Room, setRooms] = useState("");
  // this state is used to find the given data is fetched or not if fetched it perform Conditional rendering
  const [Load, isLoaded] = useState(false);
  const [houses, sethouse] = useState([]);
  //this state is used to handle the date value given by the date component
  const [value, setValue] = useState([
    dayjs(range.startDate),
    dayjs(range.endDate),
  ]);
  const seton = (e) => {
    sethouses(e);
    setonOpen(true);
  };
  // This is to get the Start and End date from the dateComponet 
  const start = value[0]?.$d ? value[0].$d : null;
  const end = value[1]?.$d ? value[1].$d : null;
  var From, To, date, date1;
    // This start if condition is if the user select the end date see line number 54 
  // this convert into date object and help to find the date present in between
  if (start) {
    date = new Date(start);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    From = date.toLocaleDateString("en-US", options);
  }
  // This end if condition is if the user select the end date see line number 54 
  // this convert into date object and help to find the date present in between
  if (end) {
    date1 = new Date(end); //const date1 = new Date(end);
    // this take the date into From 10-04-2024-ICT1232342 etc like that TO  APR 10, 2020 understand form 
    const options = { year: "numeric", month: "short", day: "2-digit" };
    To = date1.toLocaleDateString("en-US", options); //const To = date1.toLocaleDateString('en-US', options);
  }
  From = dayjs(From);
  To = dayjs(To);

  const daysCount = To.diff(From, "day");
  // this is useEffect to fetch the data of all the houses to make it visible to the user
  useEffect(() => {
    axios
      .get("http://localhost:4000/getallhouses", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        // here is the response i send from the backend comes front end 
        // this is ASYNC so The promises is should be handled 
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        // this is the response of the data i will open server open controllers see line  No 206 
        return response.data;
      })
      .then((result) => {
        // this all are the response if there is no error
        isLoaded(true);
        sethouse(result.HouseDatas);
        const Houses = JSON.stringify(result);
        // store the data in the localstorage for forther use.
        localStorage.setItem("houses", Houses);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
// this is the open is the dialog line 206
  const [open, setOpen] = useState(false);
  // is this used to find if the state is refresh
  const [datas, setdatas] = useState("");
// so this is used to open the dialog box
  const handleClickOpen = (e) => {
    // is used to find the particular id whick house is going to book store the id in a state
    setdatas(e);
    setOpen(true);
  };
  // this is function is used to book the house 
  const Booking = (e) => {
    // get the user data inserted in the localstorage
    const UserData = JSON.parse(localStorage.getItem("User"));
    // call the API to send the data backend ENDPOINT
      fetch("http://localhost:4000/Book", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserData,
          FromDate: date,
          ToDate: date1,
          OwnerId: datas._id,
        }),
      })// this is response coming from the server and convert to json() 
        .then((res) => {
          return res.json();
        })// this the data has a error or data? 
        .then((data) => {
          // it find in this date there any other booking the same house/
          if (data.Error) {
            toast.error(data.Error);
          }
          // then is call the payment functions to book
          else {
            payed();
          }
        })
        .catch((err) => {
          console.log(err);
        });
        // this is the payment function to use RAZORPAY API To pay
        // check open public file and see line 13 
    const payed = () => {
    var option = {
      key: "rzp_test_J7UhmD9UTde7WR",
      key_secret: "tDsb49YsA3eQEEXlIRV85qS2",
      amount: `${e}` * 100,
      currency: "INR",
      name: "CartRabbit Project",
      description: "For Payment",
      handler: function (response) {
        toast.success("Successfully Booked");
      },
      prefill: {
        name: "Ijaas",
        email: "ijaasahamad2003@gmail.com",
        contact: "9944669700",
      },
      notes: {
        address: "XYZ Guest Rooms",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var pay = new window.Razorpay(option);
    pay.open();
    };
  };
  // this is used to close the dialog box
  const handleClose = () => {
    setonOpen(false);
    setOpen(false);
  };

  //This function is used to when the user click the date
  const Checked = () => {
    const currentDate = new Date();
    if (date < currentDate) {
      toast.error("Please set greater than current date");
    }
    if (daysCount >= 30) {
      toast.error("Please set less than 30 Days");
    }
  }
  return (
    <section className="h-[100%]  w-screen">
      {// this is open when the user  Click the book button 
      open && (
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {" Please check the Amount "}
            </DialogTitle>
            <DialogContent>
              <Stack direction={"row"}>
                <div className="mx-[10px]">
                  <TextField
                    value={datas.OwnerName}
                    helperText={"This is the Owner Name "}
                    disabled
                    fullWidth
                  />
                </div>
                <div>
                  <TextField
                    value={datas.OwnerEmail}
                    helperText={"This is the Owner Email"}
                    disabled
                    fullWidth
                  />
                </div>
              </Stack>
              <Stack direction={"row"}>
                <div className="mx-[10px]">
                  <TextField
                    value={datas.RentAmount}
                    helperText={"This is the money "}
                    disabled
                    fullWidth
                  />
                </div>
                <div>
                  <TextField
                    value={datas.Address}
                    helperText={"This is the Owner Address of the house "}
                    disabled
                    fullWidth
                  />
                </div>
              </Stack>
            </DialogContent>
            <DialogActions style={{ margin: "20px" }}>
              <Button onClick={handleClose} variant="contained" color="error">
                Cancel
              </Button>
              <Button
                onClick={(e) => Booking(e.target.id)}
                variant="contained"
                id={datas.RentAmount}
                color="primary"
                autoFocus
              >
                Continue Booking
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
      <div>
        {// this is also Condition rendering when the opOpen has some data or true this will run
        onOpen && (
          <Dialog
            open={onOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle>This is the Image</DialogTitle>
            <DialogContent>
              <ImageList
                sx={{ width: 500, height: 450 }}
                cols={3}
                rowHeight={164}
              >
                {houses[housess].HouseImg.map((base64Image, index) => (
                  <ImageListItem key={index}>
                    <img
                      src={base64Image}
                      alt={`Image ${index}`}
                      style={{ maxWidth: "300px", height: "300px" }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>

              <DialogActions>
                <Button
                  onClick={handleClose}
                  variant="contained"
                  color="warning"
                >
                  Close
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        )}
      </div>
      {/* this is home page is starting this is seprated in two divs u see min the next line div u see another div present and min that div u see there is end */}
      {/* this is divided into two divs  the first div is show the calender make a date selection*/}
      <div style={Styles}>
        <Container maxWidth="lg">
          <div className="w-[100%] h-[100%]  ">
            <Stack
              direction={"column"}
              style={{ width: "100%", height: "950px" }}
            >
              <div className="my-[100px]">
                <h1 className="font-hometext text-center text-7xl text-primarycolor">
                  Your journey begins here
                </h1>
              </div>
              <div className="px-[20px] h-[100%]">
                <div
                  style={{
                    width: "100%",
                  }}
                  className="p-[30px] rounded-lg h-[650px] g"
                >
                  <Stack direction={"column"}>
                    <div className="h-[60px] my-[10px] w-[100%] p-[10px] ">
                      <h1 className="text-2xl font-mono text-center text-white underline">
                        Max House in Coimbator
                      </h1>
                    </div>
                    <div className="my-[20px] h-[420px] bg-white rounded-lg text-primarycolor">
                      <h1 className="text-center text-2xl font-google">
                        CheckIN and CheckOut Date
                      </h1>
                      <Stack direction={"row"}>
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                              components={[
                                "DateRangeCalendar",
                                "DateRangeCalendar",
                              ]}
                            >
                              <DemoItem>
                                <DateRangeCalendar
                                onRangePositionChange={Checked}
                                  value={value}
                                  onChange={(newValue) => setValue(newValue)}
                                />
                              </DemoItem>
                            </DemoContainer>
                          </LocalizationProvider>
                        </div>
                        <div className="h-[200px] w-[200px] text-xl m-[30px]">
                          <div className="p-[10px]">
                            <h1>Rooms and Guest</h1>
                          </div>
                          <hr></hr>
                          <div>
                            <Stack direction={"column"}>
                              <div className="m-[10px]">
                                <p className="mb-[10px]">Rooms</p>
                                <input
                                  type="number"
                                  onChange={(e) => setRooms(e.target.value)}
                                  className="p-[10px] border-[3px] rounded-xl outline-none border-blue-600"
                                  placeholder="Enter the Rooms"
                                />
                              </div>
                              <div className="m-[10px]">
                                <p className="mb-[10px]">Guest</p>
                                <input
                                  type="number"
                                  onChange={(e) => setGuest(e.target.value)}
                                  className="p-[10px] border-[3px] rounded-xl outline-none border-blue-600"
                                  placeholder="Enter the Guest"
                                />
                              </div>
                              <div></div>
                            </Stack>
                          </div>
                        </div>
                      </Stack>
                    </div>
                  </Stack>
                </div>
              </div>
            </Stack>
          </div>
        </Container>
      </div>
      {/* this the another the house available on that date is shown in this component */}
      <div className="h-[100%] w-[100%] bg-primarycolor">
        <div className="h-[100%] w-[100%]">
          <Container maxWidth={"lg"}>
            <div className="h-[100%] w-[100%]">
              <Stack direction={"column"}>
                <div className="text-white my-[70px] text-center">
                  <h1 className="text-2xl font-google">
                    Here is what you searched for
                  </h1>
                </div>
                <div className="h-[100%] w-[100%] bg-white rounded-lg p-[30px]">
                  {// this is filter to show To match the minimum condition when the house loaded
                  //first find the user search the house for staying more then the owner maximum limit
                  Load ? (
                    houses
                      .filter((house) => {
                        // Parse the 'LimitDays' value to a number
                        const limitDays = parseInt(house.LimitDays, 10); // Filter houses with 'LimitDays' less than or equal to 'daysCount'
                        return limitDays >= daysCount;
                      })
                      .filter((House) => {
                        // Filter houses based on the number of rooms and guests
                        return (
                          parseInt(House.Room, 10) >= parseInt(Room, 10) &&
                          parseInt(House.MaxGuest, 10) >= parseInt(Guest, 10)
                        );
                      })
                      .map((filteredHouse, index) => (
                        // this is shows the filtered house
                        <div key={filteredHouse._id}>
                          <div className="h-[300px] w-[100%] my-[30px]">
                            <Stack direction={"row"}>
                              <div className="mr-[70px]">
                                <img
                                  className="h-[300px] w-[350px] rounded-md bg-blackcolor hover:translate-y-[-7px] cursor-pointer duration-[1s]"
                                  src={filteredHouse.HouseImg[0]}
                                  alt="House"
                                  id={index}
                                  onClick={(e) => seton(e.target.id)}
                                />
                              </div>
                              <div>
                                <Stack direction={"row"}>
                                  <div className="h-[300px] w-[250px]">
                                    <div className="my-[25px]">
                                      <h1 className="text-2xl">
                                        House Owner Details
                                      </h1>
                                    </div>
                                    <div>
                                      <div className="m-[10px]">
                                        <h1>
                                          Owner Name : {filteredHouse.OwnerName}{" "}
                                        </h1>
                                      </div>
                                      <div className="m-[10px]">
                                        <h1>
                                          Owner Email:{" "}
                                          {filteredHouse.OwnerEmail}
                                        </h1>
                                      </div>
                                      <div className="m-[10px]">
                                        <h1>
                                          Address : {filteredHouse.Address}
                                        </h1>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="h-[300px] w-[250px]">
                                    <div className="my-[25px]">
                                      <h1 className="text-2xl ml-[20px]">
                                        Room Details
                                      </h1>
                                    </div>
                                    <div>
                                      <div className="m-[10px]">
                                        <h1>
                                          Available Rooms :{" "}
                                          <Bed className="mx-[10px]" />{" "}
                                          {filteredHouse.Room}{" "}
                                        </h1>
                                      </div>
                                      <div className="m-[10px]">
                                        <h1>
                                          Available Kitchen : <Kitchen />{" "}
                                          {filteredHouse.Kitchen}
                                        </h1>
                                      </div>
                                      <div className="m-[10px]">
                                        <h1>
                                          Maximum Stay limit :{" "}
                                          {filteredHouse.LimitDays}
                                        </h1>
                                      </div>
                                      <div className="m-[10px]">
                                        <h1>
                                          Maximum allowed to stay :
                                          {filteredHouse.MaxGuest}
                                        </h1>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="h-[300px] w-[200px] flex justify-center items-center">
                                    <div>
                                      <Button
                                        variant="contained"
                                        onClick={() =>
                                          // check the function
                                          handleClickOpen(filteredHouse)
                                        }
                                        // this used to find the which user looking to book
                                        id={filteredHouse._id}
                                        name={filteredHouse.RentAmount}
                                      >
                                        Book
                                      </Button>
                                    </div>
                                  </div>
                                </Stack>
                              </div>
                            </Stack>
                          </div>
                        </div>
                      ))
                  ) : (
                    // this is occor when there is late between the 
                    <div className="justify-center flex">
                      <h1 className="mr-[15px]"> Please fill the above data</h1>
                      <CircularProgress />
                      </div>
                  )}
                </div>
              </Stack>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
};
export default Home;
