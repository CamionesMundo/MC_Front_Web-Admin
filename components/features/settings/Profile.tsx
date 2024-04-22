import { GenericButton } from '@/components'
import { useUpdateImageProfile } from '@/hooks/api/useAdmins'
import { showToast } from '@/hooks/useToast'
import { Camera, Profile as ProfileIcon } from '@/icons'
import { capitalize } from '@/lib/utils/utils'
import { type GenericResponse } from '@/types/api'
import {
  type BodyFileImage,
  type BodyUpdateImageProfile
} from '@/types/api/request'
import { type UserResponse } from '@/types/api/response/auth'
import { Avatar } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { type ChangeEvent, useRef, useState, useEffect } from 'react'

const Profile = () => {
  const { data: session, update } = useSession()
  const router = useRouter()
  const { mutateAsync: updateProfileImagenAdmin, isPending: isPendingUpdate } =
    useUpdateImageProfile()
  const inputFilesRef = useRef<HTMLInputElement | null>(null)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [profileImageBase64, setProfileImageBase64] = useState<string | null>(
    null
  )
  const [initialProfileImage, setInitialProfileImage] = useState<string | null>(
    null
  )
  const [isEditProfileImage, setIsEditProfileImage] = useState<boolean>(false)

  useEffect(() => {
    if (session?.user.image !== undefined) {
      setProfileImage(session.user.image)
      setInitialProfileImage(session.user.image)
    }
  }, [session?.user.image])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file !== undefined) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        setIsEditProfileImage(true)
        const base64Image = reader.result as string
        setProfileImageBase64(base64Image)
        setProfileImage(URL.createObjectURL(file))
      }
      reader.onerror = (error) => {
        console.error('Error al leer el archivo:', error)
      }
    }
  }
  const handleOnCancel = () => {
    setProfileImage(initialProfileImage)
    setProfileImageBase64(null)
    setIsEditProfileImage(false)
    if (inputFilesRef.current !== null && inputFilesRef.current !== undefined) {
      inputFilesRef.current.value = ''
    }
  }

  const handleOnSave = async () => {
    const dataBody: BodyFileImage = {
      file: [
        {
          file: profileImageBase64 ?? '',
          name: ''
        }
      ]
    }
    const requestBody: BodyUpdateImageProfile = {
      id: Number(session?.user.id),
      data: dataBody
    }
    await updateProfileImagenAdmin(requestBody, {
      onSuccess: async (data: GenericResponse<UserResponse> | undefined) => {
        if (data?.error !== undefined) {
          showToast(data.message, 'error')
        } else {
          showToast(data?.message ?? '', 'success')
          setIsEditProfileImage(false)
          await update({
            ...session,
            user: { ...session?.user, image: data?.data.file_profile.url }
          })

          router.refresh()
        }
      },
      onError: (data: Error) => {
        showToast(data.message, 'error')
      }
    })
  }

  return (
    <div className='mt-4'>
      <h1 className='font-semibold text-blackText dark:text-white'>Perfil</h1>
      <span className='text-sm text-black/70 dark:text-white/70'>
        Esto muestra su perfil en nuestro sistema. Desde aquí puedes cambiar la
        imagen de tu perfil.
      </span>
      <div>
        <div className='w-full flex justify-start items-center'>
          <div className='p-3 bg-white dark:bg-darkBg shadow-container rounded-xl mt-4 flex flex-row gap-4'>
            <div className='relative'>
              <Avatar
                showFallback
                fallback={<ProfileIcon className='w-8 h-8 text-default-500' />}
                src={profileImage ?? ''}
                className='w-20 h-20 text-large'
              />
              <input
                type='file'
                multiple
                accept='image/*'
                className='hidden'
                onChange={handleFileChange}
                ref={inputFilesRef}
              />
              <div
                className='bg-white hover:cursor-pointer hover:bg-blackText hover:text-white transition-all w-8 h-8 rounded-full absolute bottom-0 right-0 flex justify-center items-center border border-gray'
                onClick={() => inputFilesRef.current?.click()}
              >
                <Camera className='h-3.5 w-3.5' />
              </div>
            </div>
            <div className='flex flex-col w-60'>
              <span className='text-blackText dark:text-white'>
                {session?.user.name}
              </span>
              <span className='text-gray-500 text-sm'>
                {capitalize(session?.user.role ?? '')}
              </span>
              <span className='text-gray-500 text-sm'>
                {session?.user.email}
              </span>
            </div>
          </div>
        </div>
        {isEditProfileImage && (
          <div className='w-full flex justify-start gap-3 mt-10'>
            <div className='w-1/4'>
              <GenericButton
                type='button'
                label={'Guardar Imagen'}
                onClick={handleOnSave}
                disabled={isPendingUpdate}
                isLoading={isPendingUpdate}
              />
            </div>
            <div className='w-1/4'>
              <GenericButton
                type='button'
                color='danger'
                label={'Cancelar'}
                onClick={handleOnCancel}
                disabled={isPendingUpdate}
                className='bg-red-700 text-white uppercase font-bold w-full dark:border dark:border-red-500'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
