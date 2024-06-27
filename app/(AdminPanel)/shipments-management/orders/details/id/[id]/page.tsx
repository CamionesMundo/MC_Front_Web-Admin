'use client'
import OrderDetail from '@/components/features/shipments-management/orders/OrderDetail'
import { MainContainer } from '@/components/ui'
import React from 'react'

const OrderDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <MainContainer>
      <OrderDetail id={params.id} />
    </MainContainer>
  )
}

export default OrderDetailPage
