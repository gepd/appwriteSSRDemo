import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createAdminClient } from "../appwrite";

export async function signOut() {
  "use server";
  const { account } = createAdminClient();

  cookies().delete(process.env.SESSION_COOKIE || "");

  await account.deleteSession("current");

  redirect("/login");
}
