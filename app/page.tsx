import { createAdminClient } from "../appwrite";
import styles from "./page.module.css";
import { getLoggedInUser } from "../helpers/getLoggedInUser";
import { signOut } from "../helpers/signOut";

export default async function Home() {
  const { account } = createAdminClient();
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
