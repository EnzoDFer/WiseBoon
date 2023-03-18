import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
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
          <Button
            className={styles.buttonBase}
            onClick={()=>signIn('github',{ callbackUrl: `/` })}
          >
            Sign in using GitHub
          </Button>:
          <Button 
            className={styles.buttonBase}
            onClick={()=>signOut()}
          >
            Sign out
          </Button>
        }
        <Link href='/' >Continue as Guest</Link>
      </div>
    </div>
  );
}

export default Login;