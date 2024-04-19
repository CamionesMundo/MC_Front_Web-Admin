'use client'
import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'
import { SessionProvider } from 'next-auth/react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { MINUTE } from '@/const/other'

interface Props {
  children: ReactNode
}

export default function Providers ({ children }: Props) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * MINUTE,
            refetchOnWindowFocus: false,
            gcTime: 10 * MINUTE,
            refetchInterval: 5 * MINUTE
          }
        }
      })
  )
  return (
    <>
      <NextUIProvider>
        <NextThemesProvider attribute='class' defaultTheme='dark'>
          <SessionProvider>
            <QueryClientProvider client={queryClient}>
              {children}
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </SessionProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </>
  )
}
