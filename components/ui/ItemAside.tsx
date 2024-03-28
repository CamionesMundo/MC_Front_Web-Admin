import { useResponsive } from '@/hooks/useResponsive'
import { useUIStore } from '@/store/useUiStore'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type ItemAsideProps = {
  IconComponent: React.FC<React.SVGProps<SVGSVGElement>>
  label: string
  href: string
}

const ItemAside = ({ IconComponent, label, href }: ItemAsideProps) => {
  const isMobile: boolean = useResponsive()
  const { changeShowMobileMenu } = useUIStore()
  const pathname = usePathname()

  return (
    <Link
      href={href}
      className={`w-full hover:bg-primary/10 ${
        pathname === href ? 'bg-primary/10' : ''
      } rounded-xl hover:cursor-pointer flex flex-row gap-2 items-center`}
      onClick={() => {
        if (isMobile) {
          changeShowMobileMenu()
        }
      }}
    >
      <div className='flex flex-row gap-2 px-3 py-3 items-center'>
        <IconComponent className='w-5 h-5 ' />
        <span className='text-sm'>{label}</span>
      </div>
    </Link>
  )
}

export { ItemAside }
