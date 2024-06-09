import React from "react";
// import { ChatState } from "../../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import "../styles.css";

const UserListItem = ({ user, handleFunction }) => {
  //   const user = ChatState();
  const { name, email, pic } = user;
  //   console.log(user);

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      // bg="#2b2d42"
      // color="white"
      _hover={{
        background: "#293241",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="white"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
      id="searchlistitem"
    >
      <Avatar mr={2} size="sm" cursor="pointer" name={name} src={pic} />
      <Box>
        <Text>{name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
