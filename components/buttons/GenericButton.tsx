import { cn } from '@/lib/clsx/clsx'
import { Button, type ButtonProps } from '@nextui-org/react'
import { type ReactNode } from 'react'

type Props = {
  label: string
  isSecondary?: boolean
  iconStart?: ReactNode
} & ButtonProps

const GenericButton = ({
  label,
  isSecondary = false,
  iconStart,
  ...props
}: Props) => {
  return (
    <div>
      <Button
        className={cn('uppercase font-bold w-full', {
          ' bg-secondary text-blackText': isSecondary,
          ' text-whitePrimary bg-blackText': !isSecondary
        })}
        {...props}
      >
        {iconStart ?? null}
        {label}
      </Button>
    </div>
  )
}

export { GenericButton }
