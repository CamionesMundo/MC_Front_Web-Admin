import { Camera, Profile as ProfileIcon } from '@/icons'
import { capitalize } from '@/lib/utils/utils'
import { Avatar } from '@nextui-org/react'
import { useSession } from 'next-auth/react'

const Profile = () => {
  const { data: session } = useSession()
  return (
    <div className='mt-4'>
      <h1 className='font-semibold text-blackText'>Perfil</h1>
      <span className='text-sm text-black/70'>
        Esto muestra su perfil en nuestro sistema. Desde aquí puedes cambiar la
        imagen de tu perfil.
      </span>
      <div>
        <div className='w-full flex justify-start items-center'>
          <div className='p-3 bg-white shadow-container rounded-xl mt-4 flex flex-row gap-4'>
            <div className='relative'>
              <Avatar
                showFallback
                fallback={<ProfileIcon className='w-8 h-8 text-default-500' />}
                src=''
                className='w-20 h-20 text-large'
              />
              <div className='bg-white hover:cursor-pointer hover:bg-blackText hover:text-white transition-all w-8 h-8 rounded-full absolute bottom-0 right-0 flex justify-center items-center border border-gray'>
                <Camera className='h-3.5 w-3.5' />
              </div>
            </div>
            <div className='flex flex-col w-60'>
              <span className='text-blackText'>{session?.user.name}</span>
              <span className='text-gray-500 text-sm'>
                {capitalize(session?.user.role ?? '')}
              </span>
              <span className='text-gray-500 text-sm'>
                {session?.user.email}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
