import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DataTable = ({ element }) => {
  const [cellData, setCellData] = useState(element?.cellData);

  const onChangeHandle = (data) => {
    const { row, col, value } = data;
    console.log(data)
  };

  return (
    <div className="w-full h-full bg-white">
      <Table>
        <TableHeader className="bg-blue-200">
          <TableRow>
            {Array.from({ length: element?.col }, (_, colIndex) => (
              <TableHead key={colIndex} className="w-[100px] border text-black font-semibold">
                {element?.cellData[colIndex]?.colHeading || " "}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white">
          {/* Render all the rows */}
          {Array.from({ length: element?.row - 1  || 0 }, (_, rowIndex) => (
            <TableRow key={rowIndex}>
              {/* Render all the columns */}
              {Array.from({ length: element?.col || 0 }, (_, colIndex) => (
                <TableCell key={colIndex} className="border">
                  <input
                    type="text"
                    className="w-full"
                    value={cellData[rowIndex]?.[`col${colIndex + 1}`] || ""}
                    onChange={(e) =>
                      onChangeHandle({
                        [`row${rowIndex+1}`]: rowIndex,
                        [`col${colIndex+1}`]: colIndex,
                        value: e.target.value,
                      })
                    }
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
