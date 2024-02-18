import { cookies, headers } from "next/headers";
import { createAppwriteClient } from "./createAppwriteClient";
import { redirect } from "next/navigation";

export async function signOut() {
  "use server";
  const { account } = createAppwriteClient(headers());

  cookies().delete(process.env.SESSION_COOKIE || "");

  await account.deleteSession("current");

  redirect("/login");
}
