import { useState } from "react"
import useSignup from "../../hooks/useSignup";
//import { useLogout } from '../../hooks/useLogout'
import { Box, TextField } from "@mui/material";
import { Images } from "../../Constants/images";
import { motion } from "framer-motion";
import { Container } from '@mui/material'
const OwnerSignup = () => {
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const { signups, isloading } = useSignup();  
  //const { logout } = useLogout();
  const HandleSignup = async (e) => {
      e.preventDefault();
      const action = "ownersignup";
      const types = "owner";
      await signups({ Email, Password, Name, PhoneNumber, action, types });
  }
  
  return (
    <section className="bg-primarycolor h-[95vh]">
      <Container maxWidth={"lg"}>
        <Box
          height={"80vh"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <motion.div
            initial={{x:"-100vw", opacity:0}}
            animate={{ x:'0', opacity:1 }}
            transition={{ delay:1, duration:0.4 }}
          >
          <div
            className={`h-${'[700px]'} p-[10px] w-[500px] mt-[50px] relative bg-white flex-col flex rounded-lg items-center justify-center`}
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
                label="Name"
                autoComplete='off'
                placeholder="Enter your Name"
                onChange={(e) => setName(e.target.value)}
                // Apply your custom CSS class
              />
            </div>
            <div className="my-[20px]  w-[80%]">
              <TextField
                fullWidth
                id="outlined-error-helper-text"
                color=""
                label="Phone Number"
                placeholder="Enter your Password"
                onChange={(e) => setPhoneNumber(e.target.value)}
                // Apply your custom CSS class
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
            <div className="mt-[30px] w-[100%]">
              <div className="ml-[40%]">

              <button disabled={isloading} className="  bg-secondarycolor text-white px-[25px] py-[10px] rounded-md hover:translate-y-[-6px] duration-500 text-xl" onClick={(e) => HandleSignup(e)} >
                Login
              </button>
              </div>
              <div className="">
                <p>Dont have an account?</p>
              </div>
            </div>
          </div>
          </motion.div>
        </Box>
      </Container>
    </section>
  )
}

export default OwnerSignup