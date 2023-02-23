import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { getToken } from "next-auth/jwt"

const authOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        Credentials({
            type: 'credentials',
            credentials: {},
            async authorize(credentials, req){
                const res = await fetch("http://127.0.0.1:8000/api/auth/login", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()
                if (res.ok && user) {
                    console.log(user.access_token)
                    return user
                }                
                // Return null if user data could not be retrieved
                return null
            }
        })
    ],
    pages: {
        signIn: '/auth/login'
    }
}

export default NextAuth(authOptions);