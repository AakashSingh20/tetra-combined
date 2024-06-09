import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import { useToast } from "@chakra-ui/react";
import { Box, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Stack } from "@chakra-ui/react";
import { getSender } from "../config/ChatLogic";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
// import { Flex } from "@chakra-ui/react";
import "./styles.css";
import BASE_URL from "../config/url";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const {
    selectedChat,
    setSelectedChat,
    user,
    chats,
    setChats,
    fetchmain,
    // setfetchmain,
  } = ChatState();

  const toast = useToast();

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  useEffect(() => {
    fetchChats();
  }, [fetchmain]);

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`${BASE_URL}/api/chats`, config);
      // console.log(data);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      // bg="white"
      w={{ base: "100%", md: "31%" }}
      // height="100%"
      // h={100}
      borderRadius="lg"
      borderWidth="1px"
      id="mainContainer"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* <Flex> */}
        My Chats
        {/* <Spacer /> */}
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
        {/* </Flex> */}
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        // bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
        id="chatsContainer"
      >
        {chats ? (
          <Stack>
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#4a4e69" : "#2b2d42"}
                color={selectedChat === chat ? "white" : "white"}
                px={5}
                py={2}
                borderRadius="lg"
                key={chat._id}
                id="listchat"
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
