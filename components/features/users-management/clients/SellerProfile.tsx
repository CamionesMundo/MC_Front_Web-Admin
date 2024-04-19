import ModalImagePreview from '@/components/modal/ModalImagePreview'
import { Check, Close, DownloadCloud, Files } from '@/icons'
import { getUserType, parseIsoDate } from '@/lib/utils/utils'
import { type FilesInfo } from '@/types/api/response/files'
import { type ClientResponse } from '@/types/api/response/user'
import { UserType } from '@/types/enums'
import {
  Chip,
  Divider,
  Image,
  Link,
  Switch,
  Tooltip,
  useDisclosure
} from '@nextui-org/react'

import React, { useState } from 'react'

const sectionClass = 'text-blackText dark:text-white font-semibold text-md'

type SellerProfileProps = {
  client: ClientResponse | null
}
const SellerProfile = ({ client }: SellerProfileProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isSelected, setIsSelected] = useState<boolean>(
    client?.seller?.approved ?? false
  )

  const [currentPicture, setCurrentPicture] = useState<FilesInfo | undefined>(
    undefined
  )

  const handleImagePreview = (picture: FilesInfo) => {
    setCurrentPicture(picture)
    onOpen()
  }

  const handleChangeSwitch = () => {
    setIsSelected(!isSelected)
  }

  const picturesVerification =
    client?.seller?.identity_verification_galleries?.files ?? []

  const filesConstitution =
    client?.seller?.company_constitution_galleries?.files ?? []
  return (
    <>
      <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 mt-2 gap-3'>
        {client?.seller?.type_seller === UserType.Business && (
          <div className='flex flex-col justify-center'>
            <span className={sectionClass}>
              Numero de RUT
            </span>
            <span className='text-md text-default-500 text-sm'>
              {client?.seller?.number_rut ?? 'No registrado'}
            </span>
          </div>
        )}
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>
            Sitio web
          </span>
          <span className='text-md text-default-500 text-sm'>
            {client?.seller?.website ?? 'No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>
            Estado de aprobación
          </span>
          <div className='flex flex-row gap-2 items-center'>
            <Tooltip content='Aprobar / Desaprobar' color='foreground'>
              <div className='flex items-center'>
                <Switch
                  size='sm'
                  isSelected={isSelected}
                  onValueChange={handleChangeSwitch}
                  color='primary'
                />
              </div>
            </Tooltip>
            <span className='text-sm text-default-500'>
              <Chip color={isSelected ? 'success' : 'danger'}>
                <div className='flex gap-1 flex-row items-center'>
                  {isSelected
                    ? (
                    <Check className='w-3 h-3' />
                      )
                    : (
                    <Close className='w-3 h-3' />
                      )}
                  <span>{isSelected ? 'Aprobado' : 'No aprobado'}</span>
                </div>
              </Chip>
            </span>
          </div>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>
            Whatsapp asociado
          </span>
          <span className='text-sm text-default-500'>
            <Chip
              color={
                client?.seller?.whatsapp_number === true ? 'primary' : 'default'
              }
            >
              {client?.seller?.whatsapp_number === true
                ? 'Asociado'
                : 'No asociado'}
            </Chip>
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>
            Tipo de Vendedor
          </span>
          <span className='text-md text-default-500 text-sm'>
            {getUserType(client?.seller?.type_seller ?? 0)}
          </span>
        </div>
        {client?.seller?.type_seller === UserType.Business && (
          <>
            <div className='flex flex-col justify-center'>
              <span className={sectionClass}>
                Nombre de la compañía
              </span>
              <span className='text-sm text-default-500'>
                {client?.seller?.company_name ?? 'No registrado'}
              </span>
            </div>
            <div className='flex flex-col justify-center'>
              <span className={sectionClass}>
                Correo electrónico de la compañía
              </span>
              <span className='text-sm text-default-500'>
                {client?.seller?.company_email ?? 'No registrado'}
              </span>
            </div>
            <div className='flex flex-col justify-center'>
              <span className={sectionClass}>
                Teléfono de la compañía
              </span>
              <span className='text-sm text-default-500'>
                {client?.seller?.company_phone ?? 'No registrado'}
              </span>
            </div>
          </>
        )}
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>
            Fecha de Creación
          </span>
          <span className='text-sm text-default-500'>
            {parseIsoDate(client?.seller?.createdAt.toString())}
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>
            Ultima actualización
          </span>
          <span className='text-sm text-default-500'>
            {parseIsoDate(client?.seller?.updatedAt.toString())}
          </span>
        </div>
      </div>
      <div className='mt-5'>
        <Divider />
      </div>
      <div className='mt-3'>
        <span className={sectionClass}>
          Verificación de Identidad
        </span>
      </div>
      <div className='w-full flex flex-row gap-3 mt-2'>
        {picturesVerification.map((picture) => (
          <div
            key={picture.idfile}
            className=' h-56 w-full sm:w-40 rounded-xl overflow-hidden hover:cursor-pointer'
            onClick={() => {
              handleImagePreview(picture)
            }}
          >
            <Image
              isBlurred
              src={picture.url}
              width={400}
              height={800}
              alt={picture.name}
              className='w-full object-cover h-56'
            />
          </div>
        ))}
      </div>
      {client?.seller?.type_seller === UserType.Business &&
        filesConstitution.length > 0 && (
          <>
            <div className='mt-3'>
              <span className={sectionClass}>
                Documentos de Constitución de Empresa
              </span>
            </div>
            <div className='mt-3'>
              {filesConstitution?.map((file) => (
                <div
                  key={file.idfile}
                  className='inline-flex gap-3 items-center'
                >
                  <div className='z-0 flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none border-medium px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-medium transition-transform-colors-opacity border-default bg-default-100 text-default-foreground'>
                    <Files className='w-5 h-5' />
                    {file.name}
                  </div>
                  <Link
                    className='hover:cursor-pointer text-primary flex items-center gap-2'
                    href={file.url}
                    download
                    target='_blank'
                  >
                    <DownloadCloud className='2-4 h-4' />
                    <span>Descargar</span>
                  </Link>
                </div>
              ))}
            </div>
          </>
      )}

      <ModalImagePreview isOpen={isOpen} onClose={onClose}>
        <div className='flex justify-center items-center'>
          <Image
            isBlurred
            src={currentPicture?.url}
            width={400}
            height={800}
            alt={currentPicture?.name}
            className='w-fit max-h-[75vh]'
          />
        </div>
      </ModalImagePreview>
    </>
  )
}

export default SellerProfile
