import { signIn, signOut, useSession } from "next-auth/react";
import Button from "../components/ui/Button/Button";
import styles from "../styles/login.module.scss";

export const Login = ():JSX.Element => {
  const {data:session, status} = useSession();

  return (
    <div
      className={styles.background}
    >
      <div className={styles.wrapper}>
        <h1>BUDGETpal</h1>
        <div
          className={styles.loginForm}
        >
          <p>Sign in to app to continue.</p>
          {
            !session?
            <Button
              variant="outline"
              onClick={()=>signIn('github',{ callbackUrl: process.env.HOST_URL })}
            >
              Sign in using GitHub
            </Button>:
            <button onClick={()=>signOut()}>
              sign out
            </button>
          }
        </div>
      </div>
    </div>
  );
}

export default Login;