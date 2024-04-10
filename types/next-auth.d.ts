import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      email: string
      token: string
      role: string
      name: string | undefined | null
      image: string | undefined | null
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    token: string
    id: string
    role: string
    profileImg: string | undefined | null
  }
}
