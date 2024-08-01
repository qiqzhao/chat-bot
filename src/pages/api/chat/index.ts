import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const OPENROUTER_API_KEY =
  "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { apiKey, content } = req.body;

    const API_KEY = apiKey || OPENROUTER_API_KEY;
    try {
      const { data } = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        JSON.stringify({
          model: "gpt-3.5-turbo-1106",
          messages: [{ role: "user", content }],
        }),
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      res.status(200).json(data);
    } catch (err) {
      console.log("err", JSON.stringify(err));
      res.status(500);
    }
  }
}
