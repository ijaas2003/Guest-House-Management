import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import useGuestHouse from "../../hooks/useGuestHouse";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Images } from "../../Constants/images";

const OwnerAddHouse = () => {
  const [image, setImage] = useState(null);
  const { GuestHouse, isLoading } = useGuestHouse();
  const { user } = useAuthContext();
  const initialize = {
    MaxGuest: "",
    Rooms: "",
    Kitchen: "",
    RentAmount: "",
    LimitDays: "",
    Address: "",
  };
  const [HouseData, setData] = useState(initialize);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...HouseData, [name]: value });
  };
  const [selectedImages, setSelectedImages] = useState([]);
  const [base64Images, setBase64Images] = useState([]);
  const convertToBase64 = (e) => {
    const files = e.target.files;
    const promises = Array.from(files).map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          resolve(e.target.result);
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsDataURL(file);
      });
    });
    Promise.all(promises)
        .then((results) => {
          setSelectedImages(Array.from(files));
          setBase64Images(results);
        })
        .catch((error) => {
          console.error("Error converting images to base64:", error);
        });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await GuestHouse({
      OwnerEmail: user.Email,
      OwnerName: user.Name,
      MaxGuest: HouseData.MaxGuest,
      Room: HouseData.Rooms,
      Kitchen: HouseData.Kitchen,
      RentAmount: HouseData.RentAmount,
      LimitDays: HouseData.LimitDays,
      Address: HouseData.Address,
      HouseImg: base64Images,
    });
  };

  return (
    <div className="h-[100%] w-screen flex justify-center items-center bg-cover" style={{ backgroundImage:`url(${Images.BG})` }}>
    <div>
      <form className="bg-white rounded-lg p-[30px] w-[500px]  flex flex-col gap-[20px]" >
        <div className="flex justify-center h-[200px] w-[100%]"> 
          <img src={Images.Owner} className="h-[150px] w-[150px]"/>
        </div>
        <TextField
          label="Max Guest"
          name="MaxGuest"
          onChange={handleChange}
          placeholder="Enter the Max Guest"
        />
        <TextField
          label="Rooms"
          name="Rooms"
          onChange={handleChange}
          placeholder="Enter the Rooms"
        />
        <TextField
          label="Kitchen"
          name="Kitchen"
          onChange={handleChange}
          placeholder="Enter the Kitchen"
        />
        <TextField
          label="Rent Amount"
          name="RentAmount"
          onChange={handleChange}
          placeholder="Enter the Rent Amount"
        />
        <TextField
          label="Limit Days"
          name="LimitDays"
          onChange={handleChange}
          placeholder="Enter the Limit Days"
        />
        <TextField
          label="Address"
          name="Address"
          onChange={handleChange}
          placeholder="Enter the Address"
        />
        <input
          type="file"
          multiple
          id="file-input"
          onChange={convertToBase64}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isLoading}
          startIcon={<CloudUploadIcon />}
          style={{ marginTop: "10px" }}
        >
          Submit
        </Button>
        {image == null ? "" : <img src={image} alt="House Preview" style={{ maxWidth: "100%", height: "auto", marginTop: "10px" }} />}
      </form>
    </div>
    </div>
  );
};

export default OwnerAddHouse;
