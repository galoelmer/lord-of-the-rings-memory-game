import Head from "next/head";
import { Bilbo } from "next/font/google";

import BackgroundImage from "@/components/background-image";

import styles from "@/styles/Home.module.css";

const inter = Bilbo({ weight: "400", subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Lord of the Rings Memory Game</title>
        <meta name="description" content="Lord of the Rings memory game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <BackgroundImage
          src="/images/backgroundImage.jpg"
          alt="A tall rock structure with the sun shining through"
          style={{ objectFit: "cover", position: "absolute", zIndex: -1 }}
        />
      </main>
    </>
  );
}
