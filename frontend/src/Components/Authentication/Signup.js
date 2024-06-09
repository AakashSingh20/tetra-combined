import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { Image } from "@chakra-ui/image";
// import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  // const [picLoading, setPicLoading] = useState(false);
  const [loading, setloading] = useState(false);

  // const navigate = useNavigate();

  const postDetails = (pics) => {};

  const submitHandler = async () => {
    // console.log("submit");
    // if (!name || !email || !password || !confirmpassword) {
    //   setloading(false);
    //   return toast({
    //     title: "Please fill all the fields",
    //     status: "error",
    //     duration: 3000,
    //     isClosable: true,
    //     position: "bottom",
    //   });
    // }
    // if (password !== confirmpassword) {
    //   setloading(false);
    //   return toast({
    //     title: "Password and Confirm Password does not match",
    //     status: "error",
    //     duration: 3000,
    //     isClosable: true,
    //     position: "bottom",
    //   });
    // }
    // try {
    //   const config = {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   };
    //   const { data } = await axios
    //     .post(
    //       "http://localhost:3000/api/user/",
    //       { name, email, password, pic },
    //       config
    //     )
    //     .then((res) => {
    //       console.log(res.data);
    //       localStorage.setItem("userInfo", JSON.stringify(data));
    //       window.location.href = "/chats";
    //       setloading(false);
    //     });
    // } catch (error) {
    //   setloading(false);
    //   toast({
    //     title: "ERROR",
    //     status: "failed",
    //     duration: 3000,
    //     isClosable: true,
    //     position: "bottom",
    //   });
    // }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => setPic(URL.createObjectURL(e.target.files[0]))}
        />
        <Image src={pic} />
        {/* {console.log(pic)} */}
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        // isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};
