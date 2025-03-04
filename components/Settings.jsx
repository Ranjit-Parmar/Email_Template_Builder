"use client";

import { SelectedElementContext } from "@/context/SelectedElement";
import React, { useContext, useEffect, useState } from "react";
import InputButton from "./Elements/ButtonSettings/InputButton";
import InputButtonColor from "./Elements/ButtonSettings/InputButtonColor";
import InputFieldChange from "./Elements/ButtonSettings/InputFieldChange";
import InputFieldOuterStyle from "./Elements/ButtonSettings/InputFieldOuterStyle";
import TableEdit from "./Elements/TableSettings/TableEdit";
import { SelectedTableCellContext } from "@/context/SelectedTableCell";
import TableCellStyle from "./Elements/TableSettings/TableCellStyle";
import FontStyle from "./Elements/ButtonSettings/FontStyle";

const Settings = () => {
  const { selectedElement, setSelectedElement } = useContext(
    SelectedElementContext
  );
  const { selectedTableCell } = useContext(SelectedTableCellContext);
  const [element, setElement] = useState();
  const [tableCellData, setTableCellData] = useState();

  useEffect(() => {
    setElement(selectedElement?.layout[selectedElement?.index]);
  }, [selectedElement]);
  
  useEffect(() => {
    if (
      selectedElement?.layout?.[selectedElement?.index]?.cellData &&
      selectedTableCell?.row !== undefined &&
      selectedTableCell?.col !== undefined
    ) {
      setTableCellData(selectedElement?.layout[selectedElement?.index]?.cellData[selectedTableCell?.row]?.[`col${selectedTableCell?.col}`] )
    }
    
  }, [tableCellData, selectedTableCell, selectedElement]);

  // Change button content
  const onInputContentChange = (fieldName, fieldValue) => {
    const updatedContent = { ...selectedElement };
    updatedContent.layout[updatedContent.index][fieldName] = fieldValue;
    setSelectedElement(updatedContent);
  };

  // Change button color
  const onInputButtonStyleChangeHandle = (fieldName, fieldValue) => {
    const updatedStyles = {
      ...selectedElement,
      layout: {
        ...selectedElement?.layout,
        [selectedElement?.index]: {
          ...element,
          style: {
            ...element?.style,
            [fieldName]: fieldValue,
          },
        },
      },
    };
    setSelectedElement(updatedStyles);
  };
  // Change font style
  const onButtonFontStyleChangeHandle = (styleValue) => {
    
    const changedStyles = {
      "fontWeight": styleValue.includes('bold') ? 'bold' : 'normal', 
      "fontStyle": styleValue.includes('italic') ? 'italic' : 'normal', 
      "textDecoration": styleValue.includes('strikethrough') ? 'underline' : 'none', 
  }

    const updatedStyles = {
      ...selectedElement,
      layout : {
        ...selectedElement?.layout,
        [selectedElement?.index] : {
          ...element,
          style: {
            ...element?.style,
            ...changedStyles
          }
        }
      }
    }

    setSelectedElement(updatedStyles);
    
  };

  // Input field styles
  const onInputFieldChange = (fieldName, fieldValue) => {
    const updatedStyles = {
      ...selectedElement,
      layout: {
        ...selectedElement?.layout,
        [selectedElement?.index]: {
          ...element,
          style: {
            ...element?.style,
            [fieldName]: fieldValue,
          },
        },
      },
    };
    setSelectedElement(updatedStyles);
  }

  // Input field outer styles
  const onInputFieldOuterStyle = (fieldName, fieldValue) => {
    const updatedStyles = {
      ...selectedElement,
      layout: {
        ...selectedElement?.layout,
        [selectedElement?.index]: {
          ...element,
          outerStyle: {
            ...element?.outerStyle,
            [fieldName]: fieldValue,
          }
        }
      }
    }
    setSelectedElement(updatedStyles);
  }

  // Table cell selection
  const onChangeTableCell = (tableCell) => {
    const updateTableCell = {
      ...selectedElement,
      layout : {
        ...selectedElement?.layout,
        [selectedElement?.index]: {
          ...element,
          [Object.keys(tableCell)[0]] : tableCell?.row,
          [Object.keys(tableCell)[1]] : tableCell?.col,
        }
      }
    }
    setSelectedElement(updateTableCell);
  }


  // Table cell style 
  const onTableCellStyleChangeHandle = (fieldName, fieldValue) => {
    const cellKey = `col${selectedTableCell?.col}`; 

    const updatedCellData = element?.cellData.map((row, rowIndex) => {
      if (rowIndex === selectedTableCell?.row) {
        // Only update the cell in the selected row
        return {
          ...row,
          [cellKey]: {
            ...row[cellKey], 
            style: {
              ...row[cellKey].style,  
              [fieldName]: fieldValue, 
            },
          },
        };
      }
      return row;
    });
  
    // Update the entire element with the new cell data
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
  };
  

  // Table font style change

  const onTableFontStyleChangeHandle = (styleValue) => {
  
    const changedStyles = {
      "fontWeight": styleValue.includes('bold') ? 'bold' : 'normal', 
      "fontStyle": styleValue.includes('italic') ? 'italic' : 'normal', 
      "textDecoration": styleValue.includes('strikethrough') ? 'underline' : 'none', 
  }

  const cellKey = `col${selectedTableCell?.col}`; 

    const updatedCellData = element?.cellData.map((row, rowIndex) => {
      if (rowIndex === selectedTableCell?.row) {
        // Only update the cell in the selected row
        return {
          ...row,
          [cellKey]: {
            ...row[cellKey], 
            style: {
              ...row[cellKey].style,  
              ...changedStyles, 
            },
          },
        };
      }
      return row;
    });

    // Update the entire element with the new cell data
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
  
  }

  return (
    <div className="h-screen bg-white space-y-5 overflow-y-auto custom-scrollbar p-2">
      <h2 className="mt-2 px-2 font-semibold text-gray-500">Setting</h2>
      <div className="space-y-2">

        {/* Button Content Logic */}
        {element?.content && (
          <InputButton
            label={"Content"}
            className="ml-3 form-input"
            elementFieldVal={element?.content}
            onInputContentChange={(val) => {
              onInputContentChange("content", val);
            }}
          />
        )}

        {/* Button Url Logic */}
        {element?.url && (
          <InputButton
            label={"Url"}
            className="ml-3 form-input"
            elementFieldVal={element?.url}
            onInputContentChange={(val) => {
              onInputContentChange("url", val);
            }}
          />
        )}

        {/* Button Background Color Logic */}
        {element?.style?.backgroundColor && (
          <InputButtonColor
            label={"Background Color"}
            elementFieldVal={element?.style?.backgroundColor}
            onInputButtonStyleChangeHandle={(val) => {
              onInputButtonStyleChangeHandle("backgroundColor", val);
            }}
          />
        )}

        {/* Button Color Logic */}
        {element?.style?.color && (
          <InputButtonColor
            label={"Color"}
            elementFieldVal={element?.style?.color}
            onInputButtonStyleChangeHandle={(val) => {
              onInputButtonStyleChangeHandle("color", val);
            }}
          />
        )}

        {/* Button Font Size Logic */}
        {element?.style?.fontSize && (
            <InputFieldChange
              label={"Font Size"}
              className="ml-3 form-input"
              elementFieldVal={element?.style?.fontSize}
              onInputFieldChange={(val) => {
                onInputFieldChange("fontSize", val);
              }}
            />
          )}

        {/* Button Font Style Logic */}
        {(element?.style?.fontWeight || element?.style?.fontStyle || element?.style?.textDecoration) && (
            <FontStyle
              label={"Font Style"}
              className="ml-3 form-input"
              elementFieldVal={[
                element?.style?.fontWeight,
                element?.style?.fontStyle,
                element?.style?.textDecoration,
              ]}
              onFontStyleChangeHandle={(val) => {
                onButtonFontStyleChangeHandle(val);
              }}
            />
          )}

        {/* Padding Logic */}
        {element?.style?.padding && (
            <InputFieldChange
              label={"Padding"}
              className="ml-3 form-input"
              elementFieldVal={element?.style?.padding}
              onInputFieldChange={(val) => {
                onInputFieldChange("padding", val);
              }}
            />
          )}

        {/* Border radius Logic */}
        {element?.style?.borderRadius && (
            <InputFieldChange
              label={"Border Radius"}
              className="ml-3 form-input"
              elementFieldVal={element?.style?.borderRadius}
              onInputFieldChange={(val) => {
                onInputFieldChange("borderRadius", val);
              }}
            />
          )}

        {/* Button align Logic */}
        {element?.outerStyle?.justifyContent && (
            <InputFieldOuterStyle
              label={"Align Button"}
              className="ml-3 form-input"
              elementFieldVal={element?.outerStyle?.justifyContent}
              onInputFieldOuterStyle={(val) => {
                onInputFieldOuterStyle("justifyContent", val);
              }}
            />
          )}

        {/* Table Logic */}
        {element?.type==='table' && 
          <TableEdit
           element={element}
           onChangeTableCell={(row,col)=>{onChangeTableCell({"row":row, "col":col})}}/>
        }

        {/* Table Style Logic */}
        {element?.type==='table' && element?.cellData && tableCellData?.style?.backgroundColor &&
          <TableCellStyle
          label={"Background Color"}
          elementFieldVal={tableCellData?.style?.backgroundColor}
          onTableCellStyleChangeHandle={(val) => {
            onTableCellStyleChangeHandle("backgroundColor", val);
          }}
        />
        }

        {/* Table Font Style Logic */}
        {element?.type==='table' && element?.cellData && (tableCellData?.style?.fontWeight || tableCellData?.style?.fontStyle || tableCellData?.style?.textDecoration) &&
          <FontStyle
          label={"Font Style"}
          className="ml-3 form-input"
          elementFieldVal={[
            tableCellData?.style?.fontWeight,
            tableCellData?.style?.fontStyle,
            tableCellData?.style?.textDecoration,
          ]}
          onFontStyleChangeHandle={(val) => {
            onTableFontStyleChangeHandle(val);
          }}
        />
        }
      </div>
    </div>
  );
};

export default Settings;
