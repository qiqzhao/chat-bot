"use client";
import React, { useState } from "react";
import { Container } from "@mui/material";
import ApiKeyInput from "@/component/api-key/api-key-input";
import ChatWindow from "@/component/chat/chat-window";

import styles from './page.module.css'

export default function Home() {
  const [apiKey, setApiKey] = useState<string | null>(null);

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
  };
  return (
    <Container maxWidth="md"  className={styles.container}>
      {apiKey === null ? (
        <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} />
      ) : (
        <ChatWindow apiKey={apiKey} />
      )}
    </Container>
  );
}
