import { showToast } from '@/hooks/useToast'
import { Delete, Document, SendFile, Upload, Visible } from '@/icons'
import { Spinner, Tooltip } from '@nextui-org/react'
import React, { useEffect } from 'react'
import { type Accept, useDropzone } from 'react-dropzone'
import Link from 'next/link'
import { type FilesSelected } from '@/types/store/custom-agents'

/**
 * The `CustomDropZone` component provides a user interface for uploading files via drag and drop or file selection.
 *
 * Props:
 * @param {string} [labelFormats='Formato permitido: PDF'] - Optional label indicating the allowed file formats.
 * @param {string} [labelMaxLength='Max. 5mb'] - Optional label indicating the maximum file size.
 * @param {string} [labelOnDrop='Arrastra tus archivos aquí'] - Optional label displayed when files are dragged over the drop zone.
 * @param {string} [label='Subir Archivo adjunto'] - Label displayed when no files are selected.
 * @param {(acceptedFiles: File[]) => void} onDrop - Callback function invoked when files are dropped or selected.
 * @param {boolean} [isMultiple=true] - Boolean indicating whether multiple files can be uploaded at once.
 * @param {Accept | undefined} [typeFiles={'application/pdf': []}] - Allowed file types to be uploaded.
 * @param {FilesSelected[]} files - Array containing information about currently selected files.
 * @param {(currentFile: FilesSelected) => void} onDelete - Callback function invoked when a file is deleted.
 * @param {() => void} onUpload - Callback function invoked when the upload button is clicked.
 * @param {boolean} [isUploading=false] - Boolean indicating whether files are currently being uploaded.
 * @param {boolean} [hasIdGallery=false] - Boolean indicating whether the component has an ID gallery.
 *
 * Behavior:
 * - Allows for drag and drop or file selection for uploading files.
 * - Displays file information and actions (delete, view) for each selected file.
 * - Supports uploading multiple files at once.
 * - Displays upload progress when files are being uploaded.
 * - Shows appropriate error messages for invalid file formats or sizes.
 */
type CustomDropZoneProps = {
  labelFormats?: string
  labelMaxLength?: string
  labelOnDrop?: string
  label?: string
  onDrop: (acceptedFiles: File[]) => void
  isMultiple?: boolean
  typeFiles?: Accept | undefined
  files: FilesSelected[]
  onDelete: (currentFile: FilesSelected) => void
  onUpload: () => void
  isUploading?: boolean
  hasIdGallery?: boolean
}

const CustomDropZone = ({
  labelFormats = 'Formato permitido: PDF',
  labelMaxLength = 'Max. 5mb',
  labelOnDrop = 'Arrastra tus archivos aquí',
  label = 'Subir Archivo adjunto',
  onDrop,
  isMultiple = true,
  typeFiles = { 'application/pdf': [] },
  files,
  onDelete,
  onUpload,
  isUploading = false,
  hasIdGallery = false
}: CustomDropZoneProps) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    fileRejections
  } = useDropzone({
    onDrop,
    multiple: isMultiple,
    accept: typeFiles
  })

  useEffect(() => {
    if (fileRejections.length > 0) {
      showToast('Solo se permiten archivos PDF.', 'warning')
    }
  }, [acceptedFiles, fileRejections])

  return (
    <>
      {files.length === 0 && (
        <div
          {...getRootProps()}
          className='dropzone border-dashed border-2 border-[#c7c7c7] dark:border-gray-500 dark:hover:border-white p-3 rounded-md bg-slate-100 dark:bg-darkBg hover:bg-slate-200 hover:cursor-pointer mt-3 flex-1'
        >
          <input {...getInputProps()} />
          {isDragActive
            ? (
            <div className='flex flex-col gap-1 items-center justify-center text-center'>
              <div className='flex flex-row gap-2 justify-center items-center text-center w-full'>
                <span className=' text-sm font-bold text-blackText dark:text-white/80'>
                  {labelOnDrop}
                </span>
                <div className='w-6 h-6'>
                  <Upload className='w-full h-full text-blackText dark:text-white/80' />
                </div>
              </div>
              <div>
                <p className='text-sm text-default-600'>{labelFormats}</p>
                <p className='text-sm text-default-600'>{labelMaxLength}</p>
              </div>
            </div>
              )
            : (
            <div className='flex flex-col gap-1 items-center justify-center text-center'>
              <div className='flex flex-row gap-2 justify-center items-center text-center w-full'>
                <span className=' text-sm font-bold text-blackText dark:text-white/80'>
                  {label}
                </span>
                <div className='w-6 h-6'>
                  <Upload className='w-full h-full text-blackText dark:text-white/80' />
                </div>
              </div>
              <div>
                <p className='text-sm text-default-600'>{labelFormats}</p>
                <p className='text-sm text-default-600'>{labelMaxLength}</p>
              </div>
            </div>
              )}
        </div>
      )}
      {files.length > 0 && (
        <div className='flex flex-col gap-2 mt-2'>
          {files.map((file) => (
            <div className='inline-flex gap-3 items-center' key={file.id}>
              <div className='z-0 flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none border-medium px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-medium transition-transform-colors-opacity border-default bg-default-100 text-default-foreground'>
                <Document className='w-5 h-5' />
                <Tooltip content={file.name}>
                  <span className='max-w-1/2 w-full overflow-hidden text-ellipsis'>
                    {file.name}
                  </span>
                </Tooltip>
              </div>
              {file.isUploaded && (
                <Link
                  className=' p-2 rounded-full hover:cursor-pointer flex gap-2 items-center flex-row'
                  href={file.url ?? ''}
                  download
                  target='_blank'
                >
                  <Visible className='w-4 h-4 text-blackText dark:text-white' />
                  <span className='text-blackText dark:text-white'>Ver</span>
                </Link>
              )}
              <Tooltip content='Quitar'>
                <div
                  className='hover:bg-slate-200 p-2 rounded-full hover:cursor-pointer'
                  onClick={() => {
                    onDelete(file)
                  }}
                >
                  <Delete className='w-4 h-4 text-danger' />
                </div>
              </Tooltip>
            </div>
          ))}
          {!hasIdGallery && (
            <div className='flex justify-start w-full'>
              <div
                className='z-0 flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none border-medium px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-medium transition-transform-colors-opacity border-default bg-blackText text-white cursor-pointer w-fit'
                onClick={onUpload}
              >
                {isUploading && (
                  <div className=' h-5 flex w-fit'>
                    <Spinner
                      label=''
                      color='primary'
                      classNames={{
                        circle1:
                          'absolute w-5 h-5 rounded-full animate-spinner-ease-spin border-solid border-t-transparent border-l-transparent border-r-transparent border-2 border-b-white',
                        circle2:
                          'absolute w-5 h-5 rounded-full opacity-75 animate-spinner-linear-spin border-dotted border-t-transparent border-l-transparent border-r-transparent border-2 border-b-white'
                      }}
                    />
                    <span>Subiendo ...</span>
                  </div>
                )}
                {!isUploading && (
                  <>
                    <SendFile className='w-5 h-5' />
                    <span>Subir archivos</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default CustomDropZone