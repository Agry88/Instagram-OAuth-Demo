import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { hostURL } from "@/config"
import z from "zod";
import getEnvironmentVariable from "@/utils/getEnvironmentVariable";

const NextRequestSchema = z.object({
  query: z.object({
    code: z.string(),
  }),
})

const AxiosResponseSchema = z.object({
  access_token: z.string(),
  user_id: z.string(),
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = NextRequestSchema.parse(req);

  const { code } = query;

  const oauthRes = await axios.post("https://api.instagram.com/oauth/access_token", {
    client_id: getEnvironmentVariable("NEXT_PUBLIC_INSTAGRAM_CLIENT_ID", ""),
    client_secret: getEnvironmentVariable("INSTAGRAM_CLIENT_SECRET", ""),
    code: code,
    grant_type: "authorization_code",
    redirect_uri: `${hostURL}/api/oauth`,
  })

  const { access_token: accessToken, user_id: userId } = AxiosResponseSchema.parse(oauthRes);
  res.redirect(`${hostURL}/redirect?accessToken=${accessToken}&userId=${userId}`);
}