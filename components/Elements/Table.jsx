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

  const tableHeading = ['Invoice','Status','Method','Amount'];
  const tableData = [
  {
    invoice: 'INV001',
    status: 'Paid',
    method: 'Credit Card',
    amount: '$250.00'
  },
  {
    invoice: 'INV002',
    status: 'Pending',
    method: 'PayPal',
    amount: '$150.00'
  }
];
  return (
    <div className='w-full h-full bg-white'>
        <Table>
  <TableHeader className="bg-blue-200">
    <TableRow >
      {tableHeading?.length > 0 && tableHeading?.map((val,i)=>
      (
      <TableHead key={i} className="w-[100px] border text-black font-semibold" >{val}</TableHead>
      ))}
    </TableRow>
  </TableHeader>
  <TableBody className="bg-white">
    {tableData?.length > 0 && tableData?.map((val,i)=>
      (<TableRow key={i}>
        <TableCell className="font-medium border">{val.invoice}</TableCell>
        <TableCell className="border">{val.status}</TableCell>
        <TableCell className="border">{val.method}</TableCell>
        <TableCell className="text-right border">{val.amount}</TableCell>
      </TableRow>)
    )}
  </TableBody>
</Table>

    </div>
  )
}

export default DataTable