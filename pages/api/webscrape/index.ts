// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { url_input } = req.query;
  let cleanedUrl;

  if (typeof url_input == "string") {
    cleanedUrl = url_input?.replace(/["']/g, "");
  }

  console.log({ cleanedUrl });

  res.status(200).json({ name: "John Doe" });
}
