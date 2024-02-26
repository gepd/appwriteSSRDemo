import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { Account, Client, Storage } from "node-appwrite";

export const createAdminClient = () => {
  const client = new Client();

  client.setEndpoint(process.env.APPWRITE_ENDPOINT || "");
  client.setProject(process.env.APPWRITE_PROJECT || "");
  client.setKey(process.env.APPWRITE_KEY || "");

  return {
    get account() {
      return new Account(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
};

export function createSessionClient(headers: Headers) {
  const client = new Client()
    .setEndpoint(process.env.PUBLIC_APPWRITE_ENDPOINT || "")
    .setProject(process.env.PUBLIC_APPWRITE_PROJECT_ID || "");

  // Get the session cookie from the request and set the session
  const cookies = parseCookie(headers.get("cookie") ?? "");
  const session = cookies.get(process.env.SESSION_COOKIE || "");
  if (session) {
    client.setSession(session);
  }

  // Return the services you need
  return {
    get account() {
      return new Account(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
}
