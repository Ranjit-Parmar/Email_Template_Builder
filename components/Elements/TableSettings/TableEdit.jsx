import { Grid3X3 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const TableEdit = ({ element, onChangeTableCell }) => {
  const [rows, setRows] = useState(element?.row || 0);
  const [cols, setCols] = useState(element?.col || 0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const totalRows = 10; // Total grid rows
  const totalCols = 10; // Total grid columns
  
  const onClickHandle = () => {
    onChangeTableCell(rows, cols);
    setIsDialogOpen(false);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Table:</label>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}> 
        <DialogTrigger onClick={() => setIsDialogOpen(true)}>
          <Grid3X3 />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select table size:{" "}
              <span className="text-blue-600">
                {cols}x{rows}
              </span>
            </DialogTitle>

            <div className="flex flex-col items-center p-4">
              <div className="grid grid-cols-10 gap-1 p-2">
                {Array.from({ length: totalRows }).map((_, rowIndex) =>
                  Array.from({ length: totalCols }).map((_, colIndex) => {
                    const isSelected = colIndex < cols && rowIndex < rows;
                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`w-6 h-6 border border-gray-400 cursor-pointer ${isSelected ? "bg-blue-400" : "bg-white"}`}
                        onMouseEnter={() => {
                          setRows(rowIndex + 1);
                          setCols(colIndex + 1);
                        }}
                        onMouseLeave={() => {
                          setRows(element?.row || 0);
                          setCols(element?.col || 0);
                        }}
                        onClick={onClickHandle}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TableEdit;
