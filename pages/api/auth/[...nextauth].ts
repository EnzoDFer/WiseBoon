import NextAuth from 'next-auth';
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
    })
  ],
  // To Re-add after finishing authorization
  // To Re-add after finishing authorization
  /* session: {
    jwt: false,
  },
  database: 'mongodburl' */
}

export default NextAuth(authOptions);