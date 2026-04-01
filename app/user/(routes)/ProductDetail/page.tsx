import React from 'react'
import { Suspense } from 'react';
import ProductDetail from '../../_components/ProductDetail';
const Page = () => {
  return (
    <>
        <Suspense fallback={<div>Loading...</div>}>
            <ProductDetail/>
        </Suspense>
    </>
  )
}

export default Page