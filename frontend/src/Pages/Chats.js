import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../Components/miscellaneous/SideDrawer";
import { Box } from "@chakra-ui/react";
import MyChats from "../Components/MyChats";
import Chatbox from "../Components/ChatBox";
import { Flex, Spacer } from "@chakra-ui/react";

const Chatpage = () => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <>
      <div style={{ width: "100%" }}>
        {user && <SideDrawer />}
        <Box
          d="flex"
          justifyContent="space-between"
          w="100%"
          h="91.5vh"
          p="10px"
        >
          <Flex>
            {user && <MyChats fetchAgain={fetchAgain} />}
            <Spacer />
            {user && (
              <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            )}
          </Flex>
        </Box>
      </div>
    </>
  );
};

export default Chatpage;
