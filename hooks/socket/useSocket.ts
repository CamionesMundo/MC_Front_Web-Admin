import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { io, type Socket } from 'socket.io-client'
import { handleSocketError } from '@/helpers/error'

const useSocket = () => {
  const { data: session } = useSession()

  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    if (session === undefined) return
    const customHeaders = {
      token: session?.user.token ?? ''
    }

    const socketIo = io('ws://143.198.63.3:9000/', {
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
