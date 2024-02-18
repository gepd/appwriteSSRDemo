import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { client } from "../appwrite";
import { Account, Storage } from "node-appwrite";

export function createAppwriteClient(headers: Headers) {
  // Extract the session from cookies and use it for the client
  const cookies = parseCookie(headers.get("cookie") ?? "");
  const session = cookies.get(process.env.SESSION_COOKIE || "");
  if (session) client.setSession(session);

  return {
    get account() {
      return new Account(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
}
