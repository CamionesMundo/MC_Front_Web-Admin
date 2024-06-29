import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import Providers from './(Providers)/Providers'
const workSans = Work_Sans({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-work-sans'
})

export const metadata: Metadata = {
  title: 'Mundo Camiones | Administrador',
  description: 'Mundo Camiones Admin es la plataforma administrativa para un mercado de vehículos comerciales. Aquí, los administradores pueden gestionar las transacciones de compra, alquiler y subasta de una variedad de vehículos, incluyendo camiones, autobuses, remolques, furgonetas y más. Esta plataforma es el complemento perfecto para nuestra aplicación móvil, permitiendo una gestión eficiente y efectiva del mercado.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    height: '100%'
  }
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
       <body
        className={`${workSans.variable} ${workSans.className} h-screen overflow-hidden w-screen`}
      >
        <Providers>{children}</Providers>
        <Toaster richColors position='top-right'/>
      </body>
    </html>
  )
}
