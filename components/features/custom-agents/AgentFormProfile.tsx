import { CustomInput } from '@/components'
import CountryAutocomplete from '@/components/autocomplete/CountryAutocomplete'
import PortAutocomplete from '@/components/autocomplete/PortAutocomplete'
import CustomDropZone from '@/components/dropzone/CustomDropZone'
import { type FormErrorMessages } from '@/helpers/error'
import { useCreateFilesGallery } from '@/hooks/api/useFiles'
import { showToast } from '@/hooks/useToast'
import { useCustomAgentFormStore } from '@/store/useCustomAgentForm'
import { type BodyFile } from '@/types/api/request/files'
import { type CustomAgentsResponse } from '@/types/api/response/custom-agents'
import { Divider, Spacer } from '@nextui-org/react'
import React, { useCallback, useEffect, useState } from 'react'
type AgentFormProfileProps = {
  isEditing: boolean
  agent: CustomAgentsResponse | undefined
  errors: FormErrorMessages | null
}
export type FilesSelected = {
  id: number | undefined
  fileBase64: string | null
  name: string
  isUploaded: boolean
  url: string | null
}
const AgentFormProfile = ({
  isEditing,
  agent,
  errors
}: AgentFormProfileProps) => {
  const { mutateAsync: createFiles, isPending } = useCreateFilesGallery()
  const [files, setFiles] = useState<FilesSelected[]>([])
  const {
    currentCountry,
    updateCountry,
    currentPort,
    updatePort,
    profileData,
    updateProfileData,
    updateIdGallery,
    idGallery
  } = useCustomAgentFormStore()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImagesBase64: FilesSelected[] = []

    const promises: Array<Promise<void>> = []

    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      const promise = new Promise<void>((resolve, reject) => {
        reader.onload = () => {
          const base64File = reader.result as string

          const data: FilesSelected = {
            fileBase64: base64File,
            id: file.lastModified,
            isUploaded: false,
            name: file.name,
            url: null
          }
          newImagesBase64.push(data)
          resolve()
        }

        reader.onerror = (error) => {
          console.error('Error al leer el archivo:', error)
          reject(error)
        }
      })

      reader.readAsDataURL(file)
      promises.push(promise)
    })

    Promise.all(promises)
      .then(() => {
        setFiles(newImagesBase64)
      })
      .catch((error) => {
        console.error('Error al leer los archivos:', error)
      })
  }, [])

  const onDelete = useCallback(
    (currentFile: FilesSelected) => {
      const filtered = files.filter((file) => file.name !== currentFile.name)
      setFiles(filtered)
    },
    [files]
  )
  const onUpload = useCallback(async () => {
    const mapped = files.map((file) => ({
      file: file.fileBase64,
      name: file.name
    }))
    const data: BodyFile = {
      file: mapped
    }

    await createFiles(data, {
      onSuccess: (response) => {
        const data = response?.data
        const { idgallery, files } = data
        updateIdGallery(idgallery)
        const newFiles = files.map((file) => ({
          id: file.idfile,
          fileBase64: null,
          name: file.name,
          isUploaded: true,
          url: file.url
        }))
        setFiles(newFiles)
        showToast('Se subieron los archivos correctamente', 'success')
      },
      onError: (data: Error) => {
        showToast(data.message, 'error')
      }
    })
  }, [files, createFiles, updateIdGallery])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const { value } = e.target

    updateProfileData({
      [name]: value
    })
  }

  useEffect(() => {
    if (files.length === 0) {
      updateIdGallery(undefined)
    }
  }, [files, updateIdGallery])

  useEffect(() => {
    if (isEditing && agent !== undefined) {
      updateProfileData({
        name: agent.name ?? '',
        surname: agent.surname ?? '',
        email: agent.email ?? '',
        phoneNumber: agent.phone_number ?? '',
        additionalPhoneNumber: agent.phone_number_2 ?? '',
        documentNumber: agent.identification_document ?? '',
        nationality: agent.nationality ?? '',
        education: agent.required_documentations?.education_level ?? '',
        expertise: agent.required_documentations?.areas_of_expertise ?? '',
        availability: agent.availability_hours ?? '',
        license: agent.required_documentations?.license_or_authorization ?? '',
        emissionDate: agent.required_documentations?.date_of_issue ?? '',
        dueDate: agent.required_documentations?.license_expiration ?? '',
        grantingEntity: agent.required_documentations?.licensing_entity ?? '',
        language1: agent.required_documentations?.language ?? '',
        language2: agent.required_documentations?.language_two ?? ''
      })
      updateCountry(agent.country)
      updatePort(agent.receiving_port)
      updateIdGallery(agent.file_certificate_data?.idgallery)
      const filesDB =
        agent.file_certificate_data?.files?.map((fileDB) => {
          const mapped: FilesSelected = {
            id: fileDB.idfile,
            fileBase64: null,
            name: fileDB.name ?? 'Documento',
            isUploaded: true,
            url: fileDB.url
          }
          return mapped
        }) ?? []
      setFiles(filesDB ?? [])
    }
  }, [
    isEditing,
    agent,
    updateProfileData,
    updateCountry,
    updatePort,
    updateIdGallery
  ])
  return (
    <>
      <Spacer />
      <Divider />

      <div className='mt-3'>
        <h1 className='font-semibold text-blackText dark:text-white'>
          Perfil del agente
        </h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-x-4 md:gap-y-1 mb-3'>
        <CustomInput
          name='name'
          type='text'
          value={profileData.name}
          onChange={(e) => {
            handleChange(e, 'name')
          }}
          color={errors?.name !== undefined ? 'danger' : 'primary'}
          label='Nombres'
          placeholder='Ej. Juan Luis'
          error={errors?.name?.toString() ?? ''}
        />
        <CustomInput
          name='surname'
          type='text'
          value={profileData.surname}
          onChange={(e) => {
            handleChange(e, 'surname')
          }}
          color={errors?.surname !== undefined ? 'danger' : 'primary'}
          label='Apellidos'
          placeholder='Ej. Sanchez Carranza'
          error={errors?.surname?.toString() ?? ''}
        />
        <CustomInput
          name='email'
          type='text'
          value={profileData.email}
          onChange={(e) => {
            handleChange(e, 'email')
          }}
          className={isEditing ? 'cursor-not-allowed' : ''}
          readOnly={isEditing}
          disabled={isEditing}
          color={errors?.email !== undefined ? 'danger' : 'primary'}
          label='Correo electrónico'
          placeholder='Ej. admin@mundocamiones.com'
          error={errors?.email?.toString() ?? ''}
        />
        <CustomInput
          name='phoneNumber'
          type='text'
          value={profileData.phoneNumber}
          onChange={(e) => {
            handleChange(e, 'phoneNumber')
          }}
          color={errors?.phoneNumber !== undefined ? 'danger' : 'primary'}
          label='Número teléfono'
          placeholder='Cod. País + Num. Ej: +51999999999'
          error={errors?.phoneNumber?.toString() ?? ''}
        />
        <CustomInput
          name='additionalPhoneNumber'
          type='text'
          value={profileData.additionalPhoneNumber}
          onChange={(e) => {
            handleChange(e, 'additionalPhoneNumber')
          }}
          color={
            errors?.additionalPhoneNumber !== undefined ? 'danger' : 'primary'
          }
          label='Número teléfono adicional'
          placeholder='Cod. País + Num. Ej: +51999999999'
          error={errors?.additionalPhoneNumber?.toString() ?? ''}
        />
        <CustomInput
          name='documentNumber'
          type='text'
          value={profileData.documentNumber}
          onChange={(e) => {
            handleChange(e, 'documentNumber')
          }}
          color={errors?.documentNumber !== undefined ? 'danger' : 'primary'}
          label='Documento de identidad'
          placeholder='Ej. 99999999'
          error={errors?.documentNumber?.toString() ?? ''}
        />
        <PortAutocomplete
          currentPort={currentPort}
          changePort={updatePort}
          error={errors?.idReceivingPort?.toString() ?? ''}
        />
        <CountryAutocomplete
          currentCountry={currentCountry}
          changeCountry={updateCountry}
          error={errors?.idCountry?.toString() ?? ''}
        />
        <CustomInput
          name='nationality'
          type='text'
          value={profileData.nationality}
          onChange={(e) => {
            handleChange(e, 'nationality')
          }}
          color={errors?.nationality !== undefined ? 'danger' : 'primary'}
          label='Nacionalidad'
          placeholder='Ej. Chileno'
          error={errors?.nationality?.toString() ?? ''}
        />
        <CustomInput
          name='education'
          type='text'
          value={profileData.education}
          onChange={(e) => {
            handleChange(e, 'education')
          }}
          color={errors?.education !== undefined ? 'danger' : 'primary'}
          label='Nivel de Educación'
          placeholder='Ej. Master'
          error={errors?.education?.toString() ?? ''}
        />
        <CustomInput
          name='expertise'
          type='text'
          value={profileData.expertise}
          onChange={(e) => {
            handleChange(e, 'expertise')
          }}
          color={errors?.expertise !== undefined ? 'danger' : 'primary'}
          label='Área de expertise'
          placeholder='Ej. Regulaciones Importaciones'
          error={errors?.expertise?.toString() ?? ''}
        />
        <CustomInput
          name='availability'
          type='text'
          value={profileData.availability}
          onChange={(e) => {
            handleChange(e, 'availability')
          }}
          color={errors?.availability !== undefined ? 'danger' : 'primary'}
          label='Disponibilidad'
          placeholder='Ej. Fulltime 9AM - 5PM, L-V'
          error={errors?.availability?.toString() ?? ''}
        />
        <CustomInput
          name='license'
          type='text'
          value={profileData.license}
          onChange={(e) => {
            handleChange(e, 'license')
          }}
          color={errors?.license !== undefined ? 'danger' : 'primary'}
          label='Licencia o Autorización'
          placeholder='Ej. ASD-1223'
          error={errors?.license?.toString() ?? ''}
        />
        <CustomInput
          name='emissionDate'
          type='date'
          value={profileData.emissionDate.toString()}
          onChange={(e) => {
            handleChange(e, 'emissionDate')
          }}
          color={errors?.emissionDate !== undefined ? 'danger' : 'primary'}
          label='Fecha de Emisión'
          placeholder='Ej. 99999999'
          error={errors?.emissionDate?.toString() ?? ''}
        />
        <CustomInput
          name='dueDate'
          type='date'
          value={profileData.dueDate.toString()}
          onChange={(e) => {
            handleChange(e, 'dueDate')
          }}
          color={errors?.dueDate !== undefined ? 'danger' : 'primary'}
          label='Fecha de Vencimiento'
          placeholder='Ej. 99999999'
          error={errors?.dueDate?.toString() ?? ''}
        />
        <CustomInput
          name='grantingEntity'
          type='text'
          value={profileData.grantingEntity}
          onChange={(e) => {
            handleChange(e, 'grantingEntity')
          }}
          color={errors?.grantingEntity !== undefined ? 'danger' : 'primary'}
          label='Entidad otorgante'
          placeholder='Ej. Customs Authority'
          error={errors?.grantingEntity?.toString() ?? ''}
        />
        <CustomInput
          name='language1'
          type='text'
          value={profileData.language1}
          onChange={(e) => {
            handleChange(e, 'language1')
          }}
          color={errors?.language1 !== undefined ? 'danger' : 'primary'}
          label='Idioma 1'
          placeholder='Ej. Inglés'
          error={errors?.language1?.toString() ?? ''}
        />
        <CustomInput
          name='language2'
          type='text'
          value={profileData.language2}
          onChange={(e) => {
            handleChange(e, 'language2')
          }}
          color={errors?.language2 !== undefined ? 'danger' : 'primary'}
          label='Idioma 2'
          placeholder='Ej. Español'
          error={errors?.language2?.toString() ?? ''}
        />
        <div className='flex flex-col'>
          <div className='mt-3'>
            <span className='font-semibold text-blackText dark:text-white text-xs'>
              {'Archivo adjunto (Certificado)'}
            </span>
          </div>
          <CustomDropZone
            onDrop={onDrop}
            isMultiple={true}
            files={files}
            onDelete={onDelete}
            onUpload={onUpload}
            labelMaxLength=''
            label='Subir certificado'
            isUploading={isPending}
            hasIdGallery={idGallery !== undefined && files.length > 0}
          />
        </div>
      </div>
    </>
  )
}

export default AgentFormProfile
