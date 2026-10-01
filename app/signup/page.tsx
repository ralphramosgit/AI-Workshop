import Link from "next/link";
import { signUp } from "../login/actions";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { error, message } = await searchParams;

  return (
    <main>
      <h1>Sign up</h1>
      {message ? (
        <p className="form-message">{message}</p>
      ) : (
        <form className="auth-form" action={signUp}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            minLength={6}
            required
          />
          {error && <p className="form-error">{error}</p>}
          <button type="submit">Sign up</button>
        </form>
      )}
      <p>
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </main>
  );
}
