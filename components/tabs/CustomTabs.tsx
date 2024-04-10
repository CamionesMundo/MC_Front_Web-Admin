import { type TabItem } from '@/types/ui/tab'
import { Tab, Tabs, type TabsProps } from '@nextui-org/react'

type CustomTabsProps = {
  tabs: TabItem[]
} & TabsProps
const CustomTabs = ({ tabs }: CustomTabsProps) => {
  return (
    <div className='w-full flex flex-col justify-center'>
      <Tabs
        aria-label='Options'
        classNames={{
          tabList:
            'gap-6 w-fit relative p-1.5 bg-primary/20 flex justify-center',
          cursor: 'w-full bg-gray-400',
          tab: 'max-w-fit px-4 h-auto',
          tabContent: 'group-data-[selected=true]:text-black  text-black/80'
        }}
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
