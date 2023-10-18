import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Button,
  CircularProgress,
  DialogTitle,
  DialogContent,
  Dialog,
  TextField,
  Stack,
  DialogActions, // Import CircularProgress for the loading spinner
} from "@mui/material";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";

const OwnerHome = () => {
  const [data, setdata] = useState([]);
  const [datas, setdatas] = useState([]);
  const [Amount, setAmount] = useState("");
  const [Room, setRooms] = useState("");
  const [Id, setId] = useState("");
  const [Kitchen, setKitchken] = useState("");
  const [LimitDays, setLimitDays] = useState("");
  
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const houseId = JSON.parse(localStorage.getItem("User"));
  useEffect(() => {
    fetch(`http://localhost:4000/getguesthome/${houseId.Email}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setdata(data.Data);
        setLoading(false);
      });
  }, [datas]);
  const GetEdit = () => {
    setLoading(true)
    fetch('http://localhost:4000/Edits',{
      method:"POST",
      headers:{
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${user.token}`
      },
      body:JSON.stringify({ Id ,Room, LimitDays, Kitchen, Amount  })
    }).then(res => {
      return res.json();
    }).then(res => {
      setdatas(res);
      setOpen(false);
    })

  }
  const HandleDelete =(e) => {
      fetch(`http://localhost:4000/delete/${e}`,{
        method:"DELETE",
        headers:{
          "Authorization" : `Bearer ${user.token}`
        }
      }).then((res) => {
        return res.json();
      }).then(data => {
        setdatas(data);
      })
  }
  const [open,setOpen] = useState(false);
  const backgroundStyle = {
    background: "linear-gradient(135deg, #FFD700, #FF5733, #6AFB92)",
    padding: "20px",
    minHeight: "100vh",
  };
  
  const handleClickOpen = (e) => {
    setId(e);
    setOpen(true);

  };
  const handleClose = () => {
    setOpen(false);
  }
  return (
    <div style={backgroundStyle}>
      {open && (
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
                    
                    onChange={(e) => setLimitDays(e.target.value)}
                    helperText={"Edits the max Amount Days "}
                    
                    fullWidth
                  />
                </div>
                <div>
                  <TextField
                    onChange={(e) => setKitchken(e.target.value)}
                    helperText={"Edits the number of Kitchen"}
                    
                    fullWidth
                  />
                </div>
              </Stack>
              <Stack direction={"row"}>
                <div className="mx-[10px]">
                  <TextField
                    onChange={(e) => setRooms(e.target.value)}
                    helperText={"Edits the number of BedRooms "}
                    
                    fullWidth
                  />
                </div>
                <div>
                  <TextField
                    onChange={(e) => setAmount(e.target.value)}
                    helperText={"Edits the NUmber of Rent Amount "}
                    
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
                onClick={GetEdit}
                variant="contained"
                color="primary"
                autoFocus
              >
                Save Changes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
      <Container maxWidth="lg">
        <div className="flex justify-end m-[20px]">
      <Button color="secondary" variant="contained"><Link to={"/owneraddhouse"}>Add House</Link></Button>
        </div>
        <TableContainer component={Paper}>
          <Table
            style={{
              minWidth: 650,
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  HouseImage
                </TableCell>
              
                <TableCell
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Max Days to Book
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  KitchKen
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Bed Room
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Rent Amount
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Edit
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
             
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} style={{ textAlign: "center" }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                data.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell>
                      <img src={data.HouseImg[0]} alt="house" style={{ height:"200px", width:"250px"}} /></TableCell>
                    <TableCell>{data.LimitDays}</TableCell>
                    <TableCell>{data.Kitchen}</TableCell>
                    <TableCell>{data.Room}</TableCell>
                   <TableCell>{data.RentAmount}</TableCell>
                    <TableCell>
                      <Button color="primary" variant="contained" id={data._id} onClick={(e) => handleClickOpen(e.target.id)}>
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button color="error" variant="contained" id={data._id} onClick={(e) => HandleDelete(e.target.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default OwnerHome;
