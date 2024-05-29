import CustomTable from '@/components/table/CustomTable'
import { auctionsQueueColumns } from '@/const/columns/post'
import { useLiveTransmissionStore } from '@/store/useLiveTransmission'
import { type LotQueueDataType } from '@/types/api/response/lots'
import { Divider, Spacer } from '@nextui-org/react'

const Queue = () => {
  const { awaitingQueue } = useLiveTransmissionStore()
  return (
    <>
      <Spacer />
      <Spacer />
      <h1 className='font-semibold text-blackText dark:text-white'>
        {`Vehículos en cola [${awaitingQueue.length}]`}
      </h1>
      <Spacer />
      <Divider />
      <Spacer />
      <div className='grid w-3/4'>
        <CustomTable<LotQueueDataType>
          filteredItems={awaitingQueue}
          topContent={false}
          columns={auctionsQueueColumns}
          emptyLabel={'No tienes ninguna subasta en cola'}
          initialVisibleColumns={auctionsQueueColumns.map(
            (column) => column.key
          )}
          isLoading={false}
          bottomContent={false}
          useScroll={true}
          usePage={false}
        />
      </div>
    </>
  )
}

export default Queue
