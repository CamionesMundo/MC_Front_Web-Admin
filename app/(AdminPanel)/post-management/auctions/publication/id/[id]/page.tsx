'use client'
import AuctionDetail from '@/components/features/post-management/auctions/AuctionDetail'
import { MainContainer } from '@/components/ui'
import React from 'react'

const AuctionDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <MainContainer>
      <AuctionDetail id={params.id}/>
    </MainContainer>
  )
}

export default AuctionDetailPage
