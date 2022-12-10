import { FormEvent } from "react";

export const loginForm = ():JSX.Element => {
  
  function handleSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
  }

  return (
    <form
      onSubmit={(e:FormEvent<HTMLFormElement>)=>handleSubmit(e)}
    >

    </form>
  );
}