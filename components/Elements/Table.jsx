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

const DataTable = ({ element }) => {
  const { selectedElement, setSelectedElement } = useContext(SelectedElementContext);
  const [cellData, setCellData] = useState(element?.cellData || []);

  // Update cellData when selectedElement changes
  useEffect(() => {
    if (selectedElement && selectedElement?.layout?.id === element?.layout?.id) {
      setCellData(selectedElement?.layout?.[selectedElement?.index]?.cellData || []);
    }
  }, [selectedElement]);

  // Handle cell data change
  const onChangeHandle = (data) => {
    const { row, col, value } = data;

    const updatedCellData = [
      ...selectedElement?.layout?.[selectedElement?.index]?.cellData.slice(0, row),
      {
        ...selectedElement?.layout?.[selectedElement?.index]?.cellData[row],
        [`col${col}`]: value,
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

  // Handle column heading change
  const onHeadingChange = (colIndex, newHeading) => {
    const updatedCellData = [...cellData];
    updatedCellData[colIndex] = {
      ...updatedCellData[colIndex],
      colHeading: newHeading,
    };

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
            {Array.from({ length: element?.col }, (_, colIndex) => (
              <TableHead key={colIndex} className="w-[100px] border text-black font-semibold">
                <input
                  type="text"
                  className="w-full bg-blue-200"
                  value={cellData[colIndex]?.colHeading || ""}
                  onChange={(e) => onHeadingChange(colIndex, e.target.value)}
                />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white">
          {/* Render all the rows */}
          {Array.from({ length: element?.row - 1 || 0 }, (_, rowIndex) => (
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
                        row: rowIndex,
                        col: colIndex + 1,
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
