import React, { createContext, useContext, useEffect, useState } from "react";
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState();
  const [notification, setNotification] = useState([]);
  const [fetchmain, setfetchmain] = useState(false);

  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //   setUser(userInfo);
  //   console.log(userInfo);
  // }, []);
  useEffect(() => {
    if (localStorage.getItem("userInfo") !== "undefined") {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      console.log("userinfo", userInfo);
      setUser(userInfo);
    } else {
      console.log("no user");
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
        fetchmain,
        setfetchmain,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
