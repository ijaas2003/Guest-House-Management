import { useState } from "react"
import useSignup from "../../hooks/useSignup";
import { Box, Container, TextField } from "@mui/material";
import { Images } from "../../Constants/images";
import { Link } from "react-router-dom";
const OwnerLogin = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const { signups, isloading } = useSignup();  
  //const { logout } = useLogout();
  const HandleLogin = async (e) => {
      e.preventDefault();
      const action = "ownerlogin";
      const types = "owner";
      await signups({Email, Password, action, types });
  }
  // const HandleLogout = () => {
  //   logout();
  // }
  return (
    <section className="bg-primarycolor h-[92vh]">
      <Container maxWidth={"lg"}>
        <Box
          height={"80vh"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <div
            className={`h-[550px] p-[10px] w-[500px] relative bg-white flex-col flex rounded-lg items-center justify-center`}
          >
            <div className={`w-[150px]  h-[100px] mb-[75px]`}>
              <img src={Images.Owner} alt="Houes" />
            </div>
            <div className="my-[20px] w-[80%]">
              <TextField
                fullWidth
                id="outlined-error-helper-text"
                color="primary"
                label="Email"
                placeholder="Enter your Email"
                // Apply your custom CSS class
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-[20px]  w-[80%]">
              <TextField
                fullWidth
                id="outlined-error-helper-text"
                color=""
                label="Password"
                placeholder="Enter your Password"
                onChange={(e) => setPassword(e.target.value)}
                // Apply your custom CSS class
              />
            </div>
            <div className="mt-[30px]">
              <button disabled={isloading} className="  bg-secondarycolor text-white px-[25px] py-[10px] rounded-md hover:translate-y-[-6px] duration-500 text-xl" onClick={(e) => HandleLogin(e)} >
                Login
              </button>
            </div>
            <div className="my-[10px]">
              <p>Dont have an account? <span><Link to={'/OwnerSignup'} className="font-bold">Signup</Link></span></p>
            </div>
          </div>
        </Box>
      </Container>
    </section>
  )
}

export default OwnerLogin;