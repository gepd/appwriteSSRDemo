import { headers } from "next/headers";
import { createSessionClient } from "../appwrite";
import { getLoggedInUser } from "../helpers/getLoggedInUser";
import { signOut } from "../helpers/signOut";
import styles from "./page.module.css";

export default async function Home() {
  const { account } = createSessionClient(headers());
  const user = await getLoggedInUser(account);
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <ul>
          <li>
            <strong>Email:</strong> {user?.email}
          </li>
          <li>
            <strong>Name:</strong> {user?.name}
          </li>
          <li>
            <strong>ID: </strong> {user?.$id}
          </li>
        </ul>
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
