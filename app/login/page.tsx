import { createAppwriteClient } from "@/app/helpers/createAppwriteClient";
import { getLoggedInUser } from "@/app/helpers/getLoggedInUser";
import { signInWithEmail } from "@/app/helpers/signInWithEmail";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const { account } = createAppwriteClient(headers());
  const user = await getLoggedInUser(account);

  if (user) redirect("/account");

  const formAction = async (form: FormData) => {
    "use server";
    const response = await signInWithEmail(form);

    if (!response?.error) {
      redirect("/");
    }
  };

  return (
    <form action={formAction}>
      <div>
        <input
          id="email"
          name="email"
          placeholder="Email"
          type="email"
          autoComplete="off"
        />
      </div>
      <div>
        <input
          id="password"
          name="password"
          placeholder="Password"
          minLength={8}
          type="password"
          autoComplete="off"
        />
      </div>
      <div>
        <button type="submit">Sign in</button>
      </div>
    </form>
  );
}
