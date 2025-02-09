import ProductTable from '@/components/ProductTable'
import React from 'react'

const page = () => {

  return (

    <div>
        <h2 className="scroll-m-20 text-gray-800 text-center border-b pb-2 mb-4 text-3xl 
        font-semibold tracking-tight first:mt-0">
            Export CSV file
        </h2>
        <ProductTable />
    </div>

  )
}

export default page