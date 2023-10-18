import { Box, Stack } from "@mui/material";
import { motion } from 'framer-motion'
//import { styled } from '@mui/system';
import useMediaQuery from "../hooks/useMediaQuery";
import { Images } from "../Constants/images";
import Bg from "../Assets/herobg.png";
import { Link } from "react-router-dom";
//import { motion } from "framer-motion";
//import { Typewriter } from "react-simple-typewriter";
const Header = () => {
  // thsi Media function i wrote to find which breakpoint is this so i display the content based on that
  // the below styles like Media ? "PC AND DESKTOPS" : "small device" 
  const Media = useMediaQuery("(min-width:1070px)");
  const backgroundStyle = {
    backgroundImage: `url(${Bg})`, // Set the background image
    backgroundSize: "cover", // Adjust background size to cover the entire element
    backgroundRepeat: "no-repeat", //  Prevent background image repetition
  };
  return (
    <div
      style={{
        width: "100%",
        height: `${Media ? "100vh" : "91vh"}`,
        ...backgroundStyle, // Apply the background style
      }}
    >
      <Box
        className="ml-[5%] w-[100%] h-[100%] flex justify-center items-center"
        width={`${Media ? "90%" : "90%"}`}
      >
        <Stack
          direction={`${Media ? "row" : "column-reverse"}`}
          spacing={4}
          width={`${Media ? "100%" : "100%"}`}
          height={`${Media ? "85%" : "80%"}`}
          display={"flex"}
          justifyContent={"space-between"}
          style={{
            //backgroundColor: "black",
            padding: `${Media ? "50px" : "20px"}`,
          }}
        >
          <Stack
            width={`${Media ? "800px" : "100%"}`}
            className="rounded-2xl m-[20px]"
            height={`${Media ? "80%" : "70% "}`}
            maxHeight={`${Media ? "100%" : "600px"}`}
          >
            <div>
              <Stack margin={""} className="text-yellow-500 font-google">
                {/* <img src={Images.Quots}/> */}
                <motion.div
                  initial={{ x:'-100vw', opacity:0 }}
                  animate={{ x:0, opacity: 1 }}
                  transition={{ delay: 1, duration:0.5}}

                >
                <div className="my-[30px]">
                  <p
                    className={`e ${Media?"text-6xl":"text-lg"}`}
                  >
                    Every House where love abides and friendship is a Guest
                  </p>
                </div>
                </motion.div>
                <motion.div
                initial={{ x:'-100vw', opacity:0 }}
                animate={{ x:0, opacity: 1 }}
                transition={{ delay: 1.5, duration:0.5}}>
                <div className="my-[30px]">
                  <p className={`${Media ? "text-3xl" : "text-xl"} text-white`}>
                    Here is the Way your Login
                  </p>
                </div>
                </motion.div>
                <motion.div
                initial={{ x:'-100vw', opacity:0 }}
                animate={{ x:0, opacity: 1 }}
                transition={{ delay: 2, duration:0.5}}>
                <div className={`my-[20px] ${Media ? "" :"flex justify-center"} `}>
                  <Stack direction={"row"}>
                    <button> <p className=" bg-white text-secondarycolor px-[25px] py-[10px] rounded-md hover:translate-y-[-6px] duration-500 text-xl"><Link to={'/ownerlogin'}>Owner</Link></p></button>
                    <button> <p className="text-white bg-secondarycolor px-[20px] py-[10px] ml-[20px] rounded-md hover:translate-y-[-6px] duration-500 text-xl"><Link to={'/login'}>Guest</Link></p></button>
                  </Stack>
                </div>
                </motion.div>
              </Stack>
            </div>
          </Stack>
          <Stack
            width={`${Media ? "800px" : "100%"}`}
            style={{ backgroundColor: "" }}
            height={`${Media ? "100% " : "80% "}`}
          >
            <div className={`ml-[${Media ? "150px" : "0"}]`}>
              <img
              className="shadow-2xl tr"
              // this is user to display the images
                src={Images.House}
                width={"100%"}
                height={"100%"}
                alt="Houes"
              />
            </div>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

export default Header;
