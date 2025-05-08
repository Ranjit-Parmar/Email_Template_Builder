import React from "react";

const TableCellStyle = ({
  label,
  fieldName,
  elementFieldVal,
  onTableCellStyleChangeHandle,
}) => {
  const colorData = [
    "#ffffff",
    "#FF5722",
    "#4CAF50",
    "#03A9F4",
    "#8BC34A",
    "#FF9800",
    "#9C27B0",
    "#FFC107",
    "#E91E63",
    "#00BCD4",
    "#673AB7",
    "#FF4081",
    "#009688",
    "#2196F3",
    "#3F51B5",
    "#FFEB3B",
  ];

  return (
    <div>
      <label className="flex flex-col items-start space-y-2 text-sm font-medium text-gray-700">
        <span>{label} :</span>
        <div className="grid grid-cols-4 gap-4 ml-2">
          {colorData?.map((color, index) => (
            <div
              key={index}
              className="border border-gray-400"
              onClick={() => onTableCellStyleChangeHandle(fieldName,color)}
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: color,
                cursor: "pointer",
                border: elementFieldVal === color && "3px solid black",
                borderRadius: "100%",
                boxShadow:
                  elementFieldVal === color
                    ? "0px 0px 10px rgba(0, 0, 0, 0.2)"
                    : "none",
              }}
            ></div>
          ))}
        </div>
      </label>
    </div>
  );
};

export default TableCellStyle;
