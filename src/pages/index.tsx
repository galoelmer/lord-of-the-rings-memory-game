import Head from "next/head";

import BackgroundImage from "@/components/background-image";
import IntroGame from "@/components/intro-game";

import styles from "@/styles/home.module.css";
import Playground from "@/components/playground";
import ScoreBar from "@/components/score";
import Modal from "@/components/modal";

export default function Home() {
  return (
    <>
      <Head>
        <title>Lord of the Rings Memory Game</title>
        <meta name="description" content="Lord of the Rings memory game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <BackgroundImage
          src="/images/backgroundImage.jpg"
          alt="A tall rock structure with the sun shining through"
          style={{ objectFit: "cover", position: "absolute", zIndex: -1 }}
        />
        <IntroGame />
        <ScoreBar />
        <Playground />
        <Modal />
      </main>
    </>
  );
}
