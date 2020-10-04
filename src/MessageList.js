import React, { memo, useEffect, useRef } from "react";
import useStyles from "./styles";

function MessageList({ messages = [] }) {
  const listRef = useRef();

  const classes = useStyles();

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({
        top: listRef.current.offsetHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div ref={listRef} className={classes.chatContainer}>
      {messages.map((message, index) => (
        <div key={`message_${index}`} className={classes.messageContainer}>
          <span className={classes.messageContent}>
            <strong>{message.author}:</strong> {message.msg}
          </span>

          <i className={classes.messageDate}>{message.date}</i>
        </div>
      ))}
    </div>
  );
}

export default memo(MessageList);
