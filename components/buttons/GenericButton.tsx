import { cn } from '@/lib/clsx/clsx'
import { Button, type ButtonProps } from '@nextui-org/react'
import { type ReactNode } from 'react'

/**
 * The `GenericButton` component represents a customizable button element
 * that can be used throughout the application with various configurations.
 * It extends the functionality of the NextUI `Button` component by adding
 * additional props for customization.
 *
 * Props:
 * @param {string} label - The text label to display on the button.
 * @param {boolean} [isSecondary] - Optional boolean flag indicating whether the button should have secondary styling.
 * @param {ReactNode} [iconStart] - Optional ReactNode representing an icon to display at the start of the button.
 * @param {...ButtonProps} props - Additional props supported by the NextUI `Button` component.
 *
 * The `GenericButton` component leverages the `clsx` utility function for managing CSS classes,
 * allowing for dynamic styling based on props such as `isSecondary`.
 * It also supports passing additional props to the underlying `Button` component provided by NextUI.
 */

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
