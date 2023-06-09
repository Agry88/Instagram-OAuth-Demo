import getEnvironmentVariable from "@/utils/getEnvironmentVariable";
import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";
import { hostURL } from "@/config";

const Home: NextPage = () => {

  const getRedirectURL = (): string => {
    const clientID = getEnvironmentVariable("NEXT_PUBLIC_INSTAGRAM_CLIENT_ID", "");
    const instagramAuthURL = `https://api.instagram.com/oauth/authorize?client_id=${clientID}&redirect_uri=${hostURL}/api/oauth/&response_type=code&scope=user_profile,user_media`;
    return instagramAuthURL;
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <a href={getRedirectURL()}>
          <button className={styles.button}>Login with Instagram</button>
        </a>
      </main>
    </>
  );
};

export default Home;
