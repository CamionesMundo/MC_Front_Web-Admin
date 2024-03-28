import { ChevronRight } from '@/icons'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export type ItemSection = {
  label: string
  href: string
}
type SectionItemAsideProps = {
  IconComponent: React.FC<React.SVGProps<SVGSVGElement>>
  label: string
  items: ItemSection[]
}

const SectionItemAside = ({
  IconComponent,
  label,
  items
}: SectionItemAsideProps) => {
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const pathname = usePathname()
  const size = 40
  const totalItems = items.length
  const height = `${totalItems * size}px`

  return (
    <div className='w-full group rounded-xl flex flex-col items-center relative'>
      <div className='flex flex-row justify-between items-center w-full pr-2 group-hover:bg-primary/10 rounded-lg'>
        <div className='flex flex-row gap-2 px-3 py-3 items-center'>
          <IconComponent className='w-5 h-5 ' />
          <span className='text-sm'>{label}</span>
        </div>
        <div
          className='p-1.5 border border-black/50 rounded-full group-hover:cursor-pointer group-hover:bg-primary/10'
          onClick={toggleVisibility}
        >
          <ChevronRight
            className={`w-2.5 h-2.5 transition-all duration-700 ease-in ${
              visible ? ' rotate-90 ' : 'rotate-0'
            }`}
          />
        </div>
      </div>
      <div
        className={
          'flex flex-col transition-height w-full duration-700 overflow-hidden'
        }
        style={{
          height: visible ? height : 0
        }}
      >
        {items.map((item) => (
          <Link
            href={item.href}
            className={`w-full transition-all ease-in pl-8 pr-3 py-2 rounded-lg hover:bg-primary/10 ${
              pathname === item.href ? 'bg-primary/10' : ''
            }`}
            key={item.label}
          >
            <span className='text-sm'>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export { SectionItemAside }
