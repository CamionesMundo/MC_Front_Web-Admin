import { type TabItem } from '@/types/ui/tab'
import { Tab, Tabs, type TabsProps } from '@nextui-org/react'

type CustomTabsProps = {
  tabs: TabItem[]
} & TabsProps
const CustomTabs = ({ tabs, ...props }: CustomTabsProps) => {
  return (
    <div className='w-full flex flex-col justify-center'>
      <Tabs
        aria-label='Options'
        classNames={{
          tabList:
            'gap-6 md:w-fit relative p-1.5 bg-primary/20 dark:bg-gray-700 flex md:justify-center',
          cursor: 'w-full bg-gray-400 dark:bg-primary',
          tab: 'max-w-fit px-4 h-auto',
          tabContent:
            'group-data-[selected=true]:text-black text-black/80 dark:text-white/80 dark:group-data-[selected=true]:text-white'
        }}
        {...props}
      >
        {tabs.map((tab) => (
          <Tab key={tab.key} title={tab.title}>
            {tab.content}
          </Tab>
        ))}
      </Tabs>
    </div>
  )
}

export default CustomTabs
