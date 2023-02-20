import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Button from "../components/ui/Button/Button";
import styles from "../styles/login.module.scss";

export const Login = ():JSX.Element => {
  const {data:session, status} = useSession();

  return (
    <div
      className={styles.background}
    >
      <div
        className={styles.iconWrapper}
      >
        <Image
          src={'/img/wiseboon-logo.svg'}
          fill
          alt='WiseBoon Logo'
        />
      </div>
      <div
        className={styles.loginForm}
      >
        {
          !session?
          <>
            <p>Sign in to continue</p>
            <Button
              className={styles.buttonBase}
              variant="outline"
              onClick={()=>signIn('github',{ callbackUrl: `/` })}
            >
              Sign in using GitHub
            </Button>
          </>:
          <button onClick={()=>signOut()}>
            sign out
          </button>
        }
      </div>
    </div>
  );
}

export default Login;