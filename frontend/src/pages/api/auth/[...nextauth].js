import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            email: credentials.email,
            password: credentials.password
          });
          
          if (data.token) {
            // Obtener información del usuario
            const userRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
              headers: {
                Authorization: `Bearer ${data.token}`
              }
            });
            
            return {
              ...userRes.data,
              accessToken: data.token
            };
          }
          return null;
        } catch (error) {
          throw new Error(error.response?.data?.message || 'Error de autenticación');
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
});