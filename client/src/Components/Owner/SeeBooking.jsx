import {
  Container,
  Stack,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Images } from "../../Constants/images";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const SeeBooking = () => {
  const { user } = useAuthContext();
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    fetch(`http://localhost:4000/getbooking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ Email: user.Email }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setloading(false);
        setdata(data.ShowBook);
      });
  }, []);
  return (
    <div
      style={{
        backgroundImage: `url(${Images.BG3})`,
        backgroundSize: "cover",
        height: "100vh",
        width: "100%",
      }}
    >
      <Container maxWidth={"lg"}>
        <div>
          <Stack>
            <div className="p-[50px]">
              <h1 className="text-center font-google text-4xl">
                View the Booking Below
              </h1>
            </div>
            <div>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>User Name</TableCell>
                      <TableCell>User Email</TableCell>
                      <TableCell>User PhoneNumber</TableCell>
                      <TableCell>From Date</TableCell>
                      <TableCell>To Date</TableCell>
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
                      data.map((house) => (
                        <TableRow key={house.id}>
                          <TableCell>{house.UserName}</TableCell>
                          <TableCell>{house.UserEmail}</TableCell>
                          <TableCell>{house.PhoneNumber}</TableCell>
                          <TableCell>{house.FromDate}</TableCell>
                          <TableCell>{house.ToDate}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Stack>
        </div>
      </Container>
    </div>
  );
};

export default SeeBooking;
