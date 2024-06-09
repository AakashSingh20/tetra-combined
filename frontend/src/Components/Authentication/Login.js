import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import BASE_URL from "../../config/url";
import { set } from "mongoose";

export const Login = ({ trigger_page }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      setLoading(false);
      return toast({
        title: "Please fill all the fields",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }

    axios
      .post(`${BASE_URL}/api/user/login`, { email, password })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          console.log(res.data);
          window.location.href = "/chats";
          // trigger_page();
          // navigate("chats");
          // window.location.reload();
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast({
          title: "Invalid Credentials",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      });
  };

  return (
    <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      {/* <Button
        variant="solid"
        // colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button> */}
    </VStack>
  );
};
