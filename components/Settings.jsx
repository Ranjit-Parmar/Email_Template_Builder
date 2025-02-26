"use client";

import { SelectedElementContext } from "@/context/SelectedElement";
import React, { useContext, useEffect, useState } from "react";
import InputButton from "./Elements/ButtonSettings/InputButton";
import InputButtonColor from "./Elements/ButtonSettings/InputButtonColor";
import InputFieldChange from "./Elements/ButtonSettings/InputFieldChange";
import InputFieldOuterStyle from "./Elements/ButtonSettings/InputFieldOuterStyle";
import DataTable from "./Elements/Table";
import TableEdit from "./Elements/TableSettings/TableEdit";

const Settings = () => {
  const { selectedElement, setSelectedElement } = useContext(
    SelectedElementContext
  );
  const [element, setElement] = useState();

  useEffect(() => {
    setElement(selectedElement?.layout[selectedElement?.index]);
  }, [selectedElement]);

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
          <TableEdit element={element} onChangeTableCell={(row,col)=>{onChangeTableCell({"row":row, "col":col})}}/>
        }
      </div>
    </div>
  );
};

export default Settings;
