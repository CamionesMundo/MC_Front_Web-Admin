'use client'
import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'
import { SessionProvider } from 'next-auth/react'

interface Props {
  children: ReactNode
}

export default function Providers ({ children }: Props) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * (60 * 1000) // 5 mins
          }
        }
      })
  )
  return (
    <>
      <NextUIProvider>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </SessionProvider>
      </NextUIProvider>
    </>
  )
}
