import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { fauna } from "../../../services/faunadb";
import { query as q} from "faunadb";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {

      const { email } = user;
        console.log(email);
      await fauna.query(
        q.Create(
          q.Collection("users"),
          { data: { email }}
        )
      )
        return true;
      } catch{
        return true;
      }
    }
  }, jwt: {
    secret: process.env.JWT_SECRET,
  },
})