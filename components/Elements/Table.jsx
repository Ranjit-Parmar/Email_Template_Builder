import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SelectedElementContext } from "@/context/SelectedElement";
import { SelectedTableCellContext } from "@/context/SelectedTableCell";

const DataTable = ({ element }) => {
  const { selectedElement, setSelectedElement } = useContext(SelectedElementContext);
  const { selectedTableCell, setSelectedTableCell } = useContext(SelectedTableCellContext);
  const [cellData, setCellData] = useState(element?.cellData || []);

  // Update cellData when selectedElement changes
  useEffect(() => {
   
      setCellData(element?.cellData || []);
    
  }, [element?.cellData]);

  // Handle cell data change
  const onChangeHandle = (data) => {
    const { row, col, value } = data;

    const updatedCellData = [
      ...selectedElement?.layout?.[selectedElement?.index]?.cellData.slice(0, row),
      {
        ...selectedElement?.layout?.[selectedElement?.index]?.cellData[row],
        [`col${col}`]: { 
          value, 
          style: selectedElement?.layout?.[selectedElement?.index]?.cellData[row]?.[`col${col}`]?.style || {} // Retain the existing style
        },
      },
      ...selectedElement?.layout?.[selectedElement?.index]?.cellData.slice(row + 1),
    ];
    
    const updatedElement = {
      ...selectedElement,
      layout: {
        ...selectedElement?.layout,
        [selectedElement?.index]: {
          ...selectedElement?.layout?.[selectedElement?.index],
          cellData: updatedCellData,
        },
      },
    };

    setSelectedElement(updatedElement);
    setCellData(updatedCellData);
  };

  return (
    <div className="w-full h-full bg-white">
      <Table>
        <TableHeader className="bg-blue-200">
          <TableRow>
            {Array.from({ length: element?.col }, (_, colIndex) => {

              const cell = cellData[colIndex]?.[`col${0}`];
              return (
              <TableHead key={colIndex} style={cell?.style || {}} className="w-[100px] border text-black font-semibold">
                <input
                  type="text"
                  style={cell?.style || {}}
                  className="w-full bg-blue-200"
                  value={cell?.value || ""}
                  onChange={(e) =>
                    onChangeHandle({
                      row: colIndex,
                      col: 0,
                      value: e.target.value,
                    })
                  }
                  onClick={() => setSelectedTableCell({ id: selectedElement?.layout?.id, row: colIndex, col:0 })}
                />
              </TableHead>
            )
            })}
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white">
          {/* Render all the rows */}
          {Array.from({ length: element?.row - 1 || 0 }, (_, rowIndex) => (
            <TableRow key={rowIndex}>
              {/* Render all the columns */}
              {Array.from({ length: element?.col || 0 }, (_, colIndex) => {
                const cell = cellData[rowIndex]?.[`col${colIndex + 1}`];
                return (
                  <TableCell
                    key={colIndex}
                    className="border"
                    onClick={() =>
                      setSelectedTableCell({
                        id: selectedElement?.layout?.id,
                        row: rowIndex,
                        col: colIndex + 1,
                      })
                    }
                    style={cell?.style || {}} // Apply custom styles if any
                  >
                    <input
                      type="text"
                      style={cell?.style || {}}
                      className="w-full"
                      value={cell?.value || ""}
                      onChange={(e) =>
                        onChangeHandle({
                          row: rowIndex,
                          col: colIndex + 1,
                          value: e.target.value,
                        })
                      }
                    />
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
