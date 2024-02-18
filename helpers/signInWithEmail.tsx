import { createAppwriteClient } from "@/app/helpers/createAppwriteClient";
import { cookies, headers } from "next/headers";

export async function signInWithEmail(form: any) {
  "use server";
  const email = form.get("email");
  const password = form.get("password");

  if (!email || !password) {
    // show error
    return;
  }

  const { account } = createAppwriteClient(headers());

  try {
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set(process.env.SESSION_COOKIE || "appwrite", session.secret, {
      path: "/",
      httpOnly: false,
      sameSite: "strict",
      secure: true,
    });

    return { response: session, error: null };
  } catch (e: any) {
    return { response: null, error: `Error: ${e.message}` };
  }
}
