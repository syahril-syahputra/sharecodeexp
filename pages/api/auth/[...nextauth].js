import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

const authOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        Credentials({
            type: 'credentials',
            credentials: {},
            async authorize(credentials, req){
                const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/login", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { 
                        "Accept" : "application/json",
                        "Content-Type": "application/json" 
                    }
                })
                const user = await res.json()
                if (res.ok && user) {
                    return {
                        name: user.data.user.name,
                        userDetail: user.data.user,
                        accessToken: user.data.token
                    }
                } 

                if(user.data) {
                    throw new Error(user.data)
                }

                return null
            }
        })
    ],
    pages: {
        signIn: '/auth/login'
    },
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                const { accessToken, ...rest } = user;
                token.accessToken = accessToken;
                token.user = rest;
              }
            return token;
        },
        async session({token}) {
            return token
        }
    }

}

export default NextAuth(authOptions);