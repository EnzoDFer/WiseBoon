import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react'

export default function IsAuthorized({children}:{children:React.ReactNode}) {

  const { data: session, status } = useSession();
  const router = useRouter();
  
  if (status==='loading') {
    return (
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
        }}
      >
        Loading...
      </div>
    )
  }  
  if (status==='unauthenticated') {
    router.push('/login');
  }

  if (session) {
    return (
      <>
        {children}
      </>
    );
  }

  return (
    <p>redirecting...</p>
  );
}
