import { Close, Logo, MC, NoMessage, SendHorizontal } from '@/icons'
import { dbFirestore } from '@/lib/firebase/firebase'
import { type CustomAgentsResponse } from '@/types/api'
import { type ClientResponse } from '@/types/api/response/user'
import {
  Avatar,
  AvatarGroup,
  Spinner,
  type TextAreaProps,
  Textarea
} from '@nextui-org/react'
import {
  type DocumentData,
  collection,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  doc
} from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReceivedMessage from './ReceivedMessage'
import MyMessage from './MyMessage'
import { type ChatMember } from '@/types/chat/chat'
import { ChatMemberType } from '@/types/enums'
import { type PublicationResponse } from '@/types/api/response/publication'

type ChatProps = {
  showChat: boolean
  chatCode: string
  buyerInfo: ClientResponse | undefined
  sellerInfo: ClientResponse | undefined
  currentAgentBuyer: CustomAgentsResponse | undefined
  currentAgentSeller: CustomAgentsResponse | undefined
  canSendMessage: Array<number | undefined>
  publication: PublicationResponse | undefined
  handleShowChat: (value: boolean) => void
}

const Chat = ({
  showChat,
  chatCode,
  buyerInfo,
  sellerInfo,
  currentAgentBuyer,
  currentAgentSeller,
  canSendMessage,
  publication,
  handleShowChat
}: ChatProps) => {
  const { data: session } = useSession()
  const endRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<DocumentData[]>([])
  const [newMessage, setNewMessage] = useState<string>('')
  const [isSendingMessage, setIsSendingMessage] = useState(false)
  const [showBodyMessage, setShowBodyMessage] = useState(true)

  const toggleBodyMessage = () => {
    setShowBodyMessage(!showBodyMessage)
  }

  const members = useMemo(() => {
    const members: ChatMember[] = []
    // Member buyer
    members.push({
      id: `${buyerInfo?.iduser ?? -1}`,
      name: buyerInfo?.username,
      role: 'Comprador',
      urlAvatar: buyerInfo?.file_profiles?.url ?? '',
      chatMemberType: ChatMemberType.appUser
    })

    // Member seller
    members.push({
      id: `${sellerInfo?.iduser ?? -1}`,
      name: sellerInfo?.username,
      role: 'Vendedor',
      urlAvatar: sellerInfo?.file_profiles?.url ?? '',
      chatMemberType: ChatMemberType.appUser
    })
    // Member Admin
    members.push({
      id: `${session?.user.id ?? -1}`,
      name: session?.user.name,
      role: session?.user.role,
      urlAvatar: session?.user.image ?? '',
      chatMemberType: ChatMemberType.admin
    })
    // Member publication
    members.push({
      id: `${publication?.idpublication ?? -1}`,
      name: null,
      role: null,
      urlAvatar: null,
      chatMemberType: ChatMemberType.publication
    })

    if (currentAgentBuyer !== undefined) {
      members.push({
        id: `${currentAgentBuyer?.idcustoms_agent ?? -1}`,
        name: `${currentAgentBuyer.name} ${currentAgentBuyer.surname}`,
        role: 'Agente aduanero (Comprador)',
        urlAvatar: currentAgentBuyer.profile_gallery?.files[0].url,
        chatMemberType: ChatMemberType.customsMember,
        isLocalUser:
          currentAgentBuyer?.iduser_admin === Number(session?.user.id)
      })
    }

    if (currentAgentSeller !== undefined) {
      members.push({
        id: `${currentAgentSeller?.idcustoms_agent ?? -1}`,
        name: currentAgentSeller.name,
        role: 'Agente aduanero (Vendedor)',
        urlAvatar: currentAgentSeller.profile_gallery?.files[0].url,
        chatMemberType: ChatMemberType.customsMember,
        isLocalUser:
          currentAgentSeller?.iduser_admin === Number(session?.user.id)
      })
    }

    return members
  }, [
    buyerInfo,
    session,
    sellerInfo,
    publication,
    currentAgentBuyer,
    currentAgentSeller
  ])

  const seatedMembers = useMemo(() => {
    const newMembers: ChatMember[] = members.map((member) => {
      const { id, ...rest } = member
      return {
        id: `${member.chatMemberType}${id}`,
        ...rest
      }
    })
    return newMembers
  }, [members])

  const localMember = useMemo(() => {
    const local = seatedMembers.find((member) => member.isLocalUser)
    return local?.id ?? ''
  }, [seatedMembers])

  const renderMessage = (message: DocumentData) => {
    const isReceived = message.idFrom !== localMember
    const content = message.content
    const sentMessages = messages.filter(
      (message) => message.idFrom === localMember
    )
    const ordered = sentMessages.sort((a, b) => b.timestamp - a.timestamp)
    const last = ordered[0]

    if (isReceived) {
      return (
        <ReceivedMessage
          key={message.timestamp}
          content={content}
          currentId={message.idFrom}
          members={seatedMembers}
          timeStamp={message.timestamp}
        />
      )
    }
    return (
      <MyMessage
        key={message.timestamp}
        content={content}
        isLast={last.timestamp === message.timestamp}
        timestamp={message.timestamp}
      />
    )
  }

  const sendMessage = useCallback(async () => {
    if (newMessage.trim() === '') return
    if (localMember === '') return
    const message = {
      idFrom: localMember,
      timestamp: Date.now().toString(),
      content: newMessage
    }
    setIsSendingMessage(true)
    try {
      const messagesCollection = collection(
        dbFirestore,
        'messages',
        chatCode,
        chatCode
      )
      const messageDoc = doc(messagesCollection, message.timestamp)
      await setDoc(messageDoc, message)
      setIsSendingMessage(false)
    } catch (error) {
      console.error('Error enviando mensaje: ', error)
      setIsSendingMessage(false)
      return
    }
    setNewMessage('')
  }, [localMember, newMessage, chatCode])

  const handleKeyDown: TextAreaProps['onKeyDown'] = (e) => {
    if (isSendingMessage) return
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()

      sendMessage()
        .then()
        .catch((error) => {
          console.error(
            'Error al volver a obtener los datos de la subasta:',
            error
          )
        })
    }
  }
  useEffect(() => {
    if (showChat || newMessage === '') {
      endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [showChat, newMessage])

  useEffect(() => {
    const q = query(
      collection(dbFirestore, 'messages', chatCode, chatCode),
      orderBy('timestamp')
    )
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesArray = querySnapshot.docs.map((doc) => doc.data())

      setMessages(messagesArray)
    })

    return () => {
      unsubscribe()
    }
  }, [chatCode])
  return (
    <div
      className={`${showChat ? 'block' : 'hidden'} fixed bottom-5 right-7 ${
        showBodyMessage ? 'max-h-[500px]' : 'max-h-[48px]'
      }  max-w-80 w-full h-full bg-white rounded-2xl z-50 border-foreground-400 shadow-container border`}
    >
      <div className='relative w-full h-full flex flex-col'>
        <div
          className='absolute top-4 right-4 w-5 h-5 hover:cursor-pointer z-10'
          onClick={() => {
            handleShowChat(false)
          }}
        >
          <Close className='w-4 h-4 text-foreground-400' />
        </div>
        <div
          className={`flex flex-row gap-2 hover:cursor-pointer items-center bg-primary px-4 ${
            showBodyMessage ? 'rounded-t-2xl' : 'rounded-2xl'
          }`}
          onClick={toggleBodyMessage}
        >
          <Logo className='w-8 h-8 text-white' />
          <MC className='w-12 h-12 text-white' />
        </div>
        <div
          className={`w-full h-fit flex justify-between gap-2 items-center flex-row py-3 px-4 ${
            showBodyMessage ? 'block' : 'hidden'
          }`}
        >
          <AvatarGroup size='sm' max={4}>
            <Avatar src={buyerInfo?.file_profiles?.url ?? ''} />

            <Avatar src={sellerInfo?.file_profiles?.url ?? ''} />

            <Avatar src={currentAgentBuyer?.profile_gallery?.files[0].url} />

            <Avatar src={currentAgentSeller?.profile_gallery?.files[0].url} />
          </AvatarGroup>
          <span className='text-sm text-foreground-700'>{chatCode}</span>
        </div>
        <div
          className={`${
            showBodyMessage ? 'block' : 'hidden'
          } w-full h-full flex flex-col px-4`}
        >
          <div
            className={`bg-white overflow-x-hidden h-fit overflow-y-auto flex flex-col ${
              canSendMessage.includes(Number(session?.user.id))
                ? 'min-h-[310px] max-h-[310px]'
                : 'max-h-[355px]'
            }`}
          >
            {messages.length > 0 && (
              <>
                {messages.map(renderMessage)}
                <div ref={endRef}></div>
              </>
            )}
            {messages.length < 0 && (
              <div className='w-full h-full flex justify-center items-center'>
                <div className='flex-col flex items-center w-full justify-center'>
                  <NoMessage className='w-7 h-7 text-foreground-500' />
                  <span className='text-sm text-foreground-500'>
                    Aún no hay mensajes
                  </span>
                </div>
              </div>
            )}
          </div>
          {canSendMessage.includes(Number(session?.user.id)) && (
            <div className='h-fit pb-4 mt-auto'>
              <Textarea
                minRows={1}
                maxRows={2}
                size='sm'
                variant='flat'
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value)
                }}
                aria-label='message'
                placeholder='Ingresa tu mensaje'
                disabled={isSendingMessage}
                endContent={
                  <div onClick={isSendingMessage ? undefined : sendMessage}>
                    {isSendingMessage && (
                      <Spinner label='' color='primary' size='sm' />
                    )}
                    {!isSendingMessage && (
                      <SendHorizontal className='w-5 h-5 text-foreground-500 hover:cursor-pointer hover:text-primary' />
                    )}
                  </div>
                }
                onKeyDown={handleKeyDown}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Chat
