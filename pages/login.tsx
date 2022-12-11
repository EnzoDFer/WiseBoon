import { signIn, signOut, useSession } from "next-auth/react";
import Button from "../components/ui/Button/Button";

export const Login = ():JSX.Element => {
  const {data:session, status} = useSession();

  return (
    <div>
      Sign in to app to store your work or continue as guest.
      {
        !session?  
        <Button
          variant="fill"
          onClick={()=>signIn('github',{ callbackUrl: 'http://localhost:3000/' })}
        >
          Sign in using GitHub
        </Button>:
        <button onClick={()=>signOut()}>
          sign out
        </button>
      }
    </div>
  );
}

export default Login;