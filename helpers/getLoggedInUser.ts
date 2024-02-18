import { Account } from "node-appwrite";

export async function getLoggedInUser(account: Account) {
  try {
    return await account.get();
  } catch {
    return undefined;
  }
}
