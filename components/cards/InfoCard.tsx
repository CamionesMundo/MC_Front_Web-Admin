import { Info } from '@/icons'
import { cn } from '@/lib/clsx/clsx'
import { Link } from '@nextui-org/react'
import React from 'react'

/**
 * The `InfoCard` component displays an informational card with an optional link.
 * This component is useful for showing brief pieces of information with an associated icon and optional link.
 *
 * Props:
 * @param {string} content - The main text content of the info card.
 * @param {string} [href] - Optional URL that the link will point to.
 * @param {string} [link] - Optional text to display as a link. If provided, the link will be shown.
 * @param {boolean} [noMargin=false] - If true, removes the default margin from the card.
 *
 * Behavior:
 * - Displays an information icon on the left side of the card.
 * - Shows the `content` text in a muted style.
 * - If the `link` prop is provided, a clickable link is displayed below the `content` text.
 * - The card has a default margin which can be removed by setting `noMargin` to true.
 *
 * Example usage:
 * ```jsx
 * <InfoCard
 *   content="This is an important information message."
 *   link="Read more"
 *   href="https://example.com"
 * />
 * ```
 *
 * This component can be used to highlight important information or notices in your application.
 */

type Props = {
  content: string
  href?: string
  link?: string
  noMargin?: boolean
}

const InfoCard = ({ content, link = '', noMargin = false, href }: Props) => {
  return (
    <div
      className={cn(
        'w-full flex gap-5 flex-row border-gray border rounded-xl py-2 px-5 bg-slate-100',
        { 'my-3': !noMargin, 'my-0': noMargin }
      )}
    >
      <div className='flex justify-center items-center'>
        <Info className='w-4 h-4 text-textCardInfo' />
      </div>
      <div className='flex flex-col w-full h-full'>
        <p className='text-muted text-[10px]'>{content}</p>
        {link !== '' && (
          <Link
            href={href ?? ''}
            className='text-muted text-[10px]'
            underline='always'
          >
            {link}
          </Link>
        )}
      </div>
    </div>
  )
}

export default InfoCard
