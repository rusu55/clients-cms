import NextAuth from "next-auth";

const authOptions = {}

const handler = NextAuth(authOptions)


export { handler as GET, handler as POST}