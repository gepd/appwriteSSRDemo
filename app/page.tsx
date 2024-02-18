import Image from "next/image";
import { signOut } from "../helpers/signOut";
import styles from "./page.module.css";
import { createAppwriteClient } from "../helpers/createAppwriteClient";
import { headers } from "next/headers";

export default async function Home() {
  const { storage } = createAppwriteClient(headers());
  const arrayBufferLogo = await storage.getFileView(
    "appwrite",
    "appwrite-light"
  );
  const logo = Buffer.from(arrayBufferLogo).toString("base64");
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src={`data:image/svg+xml;base64,${logo}`}
          alt="Appwrite logo"
          width={132}
          height={24}
          priority
        />
      </div>

      <div className={styles.grid}>
        <p>Welcome to appwrite SSR.</p>
        <p>You&apos;re loged in with SSR.</p>
        <form action={signOut}>
          <button type="submit">sign out</button>
        </form>
      </div>
    </main>
  );
}
