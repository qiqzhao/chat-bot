import React, { useState } from "react";
import { TextField, Button, List } from "@mui/material";
import axios from "axios";
import ChatItem from "./chat-item";

import styles from "./chat.module.css";

interface IProps {
  apiKey: null | string;
}

const ChatWindow = ({ apiKey }: IProps) => {
  const [messages, setMessages] = useState<{ user: boolean; text: string }[]>(
    []
  );
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      setInputText("");
      const newMessages = [...messages, { user: true, text: inputText }];
      setMessages(newMessages);

      setLoading(true);
      axios
        .post("/api/chat", { apiKey, content: inputText })
        .then(({ data }: any) => {
          setMessages([
            ...newMessages,
            { user: false, text: data?.choices[0]?.message?.content },
          ]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <List className={styles.messages}>
        {messages.map((message, index) => (
          <ChatItem key={index} message={message} />
        ))}
      </List>
      <div className={styles.searchContainer}>
        <TextField
          value={inputText}
          onChange={(e: any) => setInputText(e.target.value)}
          placeholder="Type your message..."
          fullWidth
        />
        <Button
          variant="contained"
          disabled={!inputText || loading}
          onClick={handleSendMessage}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2 0.01 7Z"
              fill="#1F2937"
            />
          </svg>
        </Button>
      </div>
    </>
  );
};

export default ChatWindow;
