import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

const DataTable = () => {
  return (
    <div className='w-full h-full bg-white'>
        <Table>
  <TableHeader className="bg-blue-200">
    <TableRow >
      <TableHead className="w-[100px] border text-black font-semibold" >Invoice</TableHead>
      <TableHead className="border text-black font-semibold">Status</TableHead>
      <TableHead className="border text-black font-semibold">Method</TableHead>
      <TableHead className="text-right border text-black font-semibold">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody className="bg-white">
    <TableRow>
      <TableCell className="font-medium border">INV001</TableCell>
      <TableCell className="border">Paid</TableCell>
      <TableCell className="border">Credit Card</TableCell>
      <TableCell className="text-right border">$250.00</TableCell>
    </TableRow>
        <TableRow>
        <TableCell className="font-medium border">INV001</TableCell>
        <TableCell className="border">Paid</TableCell>
        <TableCell className="border">Credit Card</TableCell>
        <TableCell className="text-right border">$250.00</TableCell>
        </TableRow>
  </TableBody>
</Table>

    </div>
  )
}

export default DataTable