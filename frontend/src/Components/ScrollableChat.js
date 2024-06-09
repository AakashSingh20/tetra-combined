import React from "react";
import { Avatar, Tooltip } from "@chakra-ui/react";
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "../Context/ChatProvider";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogic";
import "./styles.css";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  return (
    <div className="scroll_feed">
      <ScrollableFeed>
        {messages &&
          messages.map((m, i) => (
            <div style={{ display: "flex" }} key={m._id} id="msg">
              {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <div id="sendername">
                  <Tooltip
                    label={m.sender.name}
                    placement="bottom-start"
                    hasArrow
                  >
                    <Avatar
                      mt="7px"
                      mr={1}
                      size="sm"
                      cursor="pointer"
                      name={m.sender.name}
                      src={m.sender.pic}
                    />
                  </Tooltip>
                  {/* <a>{m.sender.name}</a> */}
                </div>
              )}
              <span
                style={{
                  backgroundColor: `${
                    m.sender._id === user._id ? "#16db65" : "#293241"
                  }`,
                  marginLeft: isSameSenderMargin(messages, m, i, user._id),
                  marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                }}
                id="spanchat"
              >
                {m.content}
              </span>
            </div>
          ))}
      </ScrollableFeed>
    </div>
  );
};

export default ScrollableChat;
