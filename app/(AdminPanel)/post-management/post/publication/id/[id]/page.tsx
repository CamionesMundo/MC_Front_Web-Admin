'use client'
import ProductDetail from '@/components/features/post-management/products/ProductDetail'
import { MainContainer } from '@/components/ui'
import React from 'react'

const PostDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <MainContainer>
      <ProductDetail id={params.id}/>
    </MainContainer>
  )
}

export default PostDetailPage
