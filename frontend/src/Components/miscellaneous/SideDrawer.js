import { Button, Tooltip, Menu } from "@chakra-ui/react";
import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
import { Avatar, MenuButton } from "@chakra-ui/react";
// import { Flex, Spacer } from "@chakra-ui/react";
import { MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";
import ProfileModal from "./ProfileModal";
import { getSender } from "../../config/ChatLogic";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Input,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";
import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/react";
// import Badge from "@mui/material/Badge";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import BASE_URL from "../../config/url";
import { useNavigate } from "react-router-dom";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const {
    setSelectedChat,
    user,
    chats,
    setChats,
    notification,
    setNotification,
    fetchmain,
    setfetchmain,
  } = ChatState();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    // window.location.reload();
    // trigger_page();
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something to search",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios
        .get(`${BASE_URL}/api/user?search=${search}`, config)
        .then((res) => {
          setSearchResult(res.data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios
        .post(`${BASE_URL}/api/chats`, { userId }, config)
        .then((res) => {
          setSelectedChat(res.data);
          setLoadingChat(false);
          setfetchmain(!fetchmain);
          onClose();
        });
      //   console.log(data);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
    } catch (error) {
      // toast({
      //   title: "Error fetching the chat",
      //   description: error.message,
      //   status: "error",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "bottom-left",
      // });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        // bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        {/* <Flex> */}
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        {/* <Spacer /> */}

        <Text fontSize="2xl" fontFamily="Work sans">
          Tetra
        </Text>
        {/* <Spacer /> */}

        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>

            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
        {/* </Flex> */}
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              {/* <Flex> */}
              <Input
                placeholder="Search by name"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {/* <Spacer /> */}
              <Button onClick={handleSearch}>Go</Button>
              {/* </Flex> */}
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
