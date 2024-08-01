import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

import style from "./api-key.module.css";

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeySubmit }) => {
  const [apiKey, setApiKey] = useState("");

  const handleSubmit = () => {
    onApiKeySubmit(apiKey);
  };

  return (
    <div className={style.container}>
      <Typography variant="h6">Enter your OpenRouter API key</Typography>
      <TextField
        value={apiKey}
        onChange={(e: any) => setApiKey(e.target.value)}
        label="API Key"
        variant="outlined"
        fullWidth
      />
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default ApiKeyInput;
