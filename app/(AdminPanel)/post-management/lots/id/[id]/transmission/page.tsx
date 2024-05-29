'use client'

import LotTransmission from '@/components/features/post-management/lots/transmission/LotTransmission'
import { MainContainer } from '@/components/ui'

const LotTransmissionPage = ({ params }: { params: { id: string } }) => {
  return (
    <MainContainer>
      <LotTransmission id={params.id} />
    </MainContainer>
  )
}

export default LotTransmissionPage
