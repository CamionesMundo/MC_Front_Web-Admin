import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { io, type Socket } from 'socket.io-client'
import { handleSocketError } from '@/helpers/error'

const useSocket = () => {
  const { data: session } = useSession()

  const [socket, setSocket] = useState<Socket | null>(null)

  /* This `useEffect` hook is responsible for setting up and managing the WebSocket connection using
  Socket.IO. Here's a breakdown of what it does: */
  useEffect(() => {
    if (session === undefined) return
    const customHeaders = {
      token: session?.user.token ?? ''
    }

    const socketIo = io(process.env.NEXT_PUBLIC_SOCKET_URL ?? '', {
      extraHeaders: customHeaders,
      transports: ['websocket'],
      reconnectionAttempts: 5,
      timeout: 2000
    })

    socketIo.on('connect_error', (error) => {
      console.log('Error de conexión:', error)
      handleSocketError(error)
    })

    socketIo.on('reconnect_failed', (error) => {
      console.log('Intento de reconexión fallido')
      handleSocketError(error)
    })

    socketIo.on('connect', () => {
      console.log('Conectado al servidor')
    })

    socketIo.on('disconnect', (reason) => {
      console.log('Desconectado del servidor:', reason)
    })

    setSocket(socketIo)

    return () => {
      socketIo.disconnect()
    }
  }, [session])

  return socket
}

export default useSocket
