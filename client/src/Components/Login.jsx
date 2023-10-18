import { useState } from "react";
import useSignup from "../hooks/useSignup";
import { Images } from "../Constants/images";
import { TextField, Container, Box } from "@mui/material";
const Login = () => {
  // This is the login function
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  // this is import from CustomHook called useSignup
  const { signups } = useSignup();

  const HandleLogin = async (e) => {
    e.preventDefault();
    const action = "userlogin";
    const types = "user";
    await signups({ Email, Password, action, types });
  };
  
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
            <div className={`w-[200px]  h-[100px] mb-[75px]`}>
              <img src={Images.Guest} alt="Houes" />
            </div>
            <div className="my-[20px] w-[80%]">
              <TextField
                fullWidth
                id="outlined-error-helper-text"
                color="primary"
                label="Email"
                placeholder="Enter your Email"
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
              />
            </div>
            <div className="mt-[30px]">
              <button  className="  bg-secondarycolor text-white px-[25px] py-[10px] rounded-md hover:translate-y-[-6px] duration-500 text-xl" onClick={(e) => HandleLogin(e)} >
                Login
              </button>
             
            </div>
          </div>
        </Box>
      </Container>
    </section>
  );
};

export default Login;
