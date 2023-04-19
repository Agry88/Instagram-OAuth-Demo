import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { hostURL } from "@/config"
import z from "zod";
import getEnvironmentVariable from "@/utils/getEnvironmentVariable";

const AxiosResponseSchema = z.object({
  data: z.object({
    access_token: z.string(),
    user_id: z.string(),
  })
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { code } = req.query;

  const axiosResponse = await axios.post("https://api.instagram.com/oauth/access_token", {
    client_id: getEnvironmentVariable("NEXT_PUBLIC_INSTAGRAM_CLIENT_ID", ""),
    client_secret: getEnvironmentVariable("INSTAGRAM_CLIENT_SECRET", ""),
    code: code,
    grant_type: "authorization_code",
    redirect_uri: `${hostURL}/api/oauth/`,
  }, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  })
    .catch((err) => {
    console.error(err);
    res.status(500).send("Something went wrong");
  })
  
  const { data: { access_token: accessToken, user_id: userId } } = AxiosResponseSchema.parse(axiosResponse);
  res.redirect(`${hostURL}/redirect?accessToken=${accessToken}&userId=${userId}`);
}