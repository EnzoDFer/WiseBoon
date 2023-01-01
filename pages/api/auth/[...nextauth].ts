import NextAuth from 'next-auth';
import { Provider } from 'next-auth/providers';
import GithubProvider from 'next-auth/providers/github';

if (
  !process.env.GITHUB_ID ||
  !process.env.GITHUB_SECRET 
) {
  throw new Error('Error wih authentication')
}

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  session: {
    maxAge: 24 * 60 * 60
  },
}

export default NextAuth(authOptions);