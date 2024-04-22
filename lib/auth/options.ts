import CredentialsProvider from 'next-auth/providers/credentials'
import { type NextAuthOptions } from 'next-auth'
import { type GenericResponse } from '@/types/api'
import { type UserDataResponse } from '@/types/api/response/auth'

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'Ingrese Email' },
        password: {
          label: 'password',
          type: 'password',
          placeholder: 'Ingrese Password'
        }
      },
      /* The `async authorize(credentials)` function is a custom authentication function defined within
        the NextAuth configuration options. This function is responsible for handling the
        authentication process when a user tries to sign in using the CredentialsProvider. */
      async authorize (credentials) {
        const { email, password } = credentials as {
          email: string
          password: string
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/admin/users/login`,
          {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
          }
        )

        if (!res.ok) {
          throw new Error(
            'Error en la autenticación. Por favor, intente de nuevo.'
          )
        }
        const response = (await res.json()) as GenericResponse<UserDataResponse>

        if (response.error !== undefined) {
          throw new Error(response.message)
        }
        const loginData = response.data
        return {
          id: loginData.user.iduser_admin.toString(),
          email: loginData.user.email,
          profileImg: loginData.user.file_profile.url,
          role: loginData.user.role.name_role,
          token: loginData.token,
          name: loginData.user.name_user
        }
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    /* The `async jwt` and `async session` callbacks in the NextAuth configuration are responsible for
      manipulating the JWT token and session object, respectively. */
    async jwt ({ token, user, trigger, session }) {
      if (trigger === 'update') {
        token.profileImg = session.user.image
        token.name = session.user.name
      }
      return { ...token, ...user }
    },
    async session ({ session, token }) {
      session.user.token = token.token
      session.user.role = token.role
      session.user.name = token.name
      session.user.image = token.profileImg
      session.user.id = token.id
      return session
    }
  }
}

export default authOptions
