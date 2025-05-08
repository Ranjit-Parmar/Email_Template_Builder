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
import TableFontStyle from "./Elements/TableSettings/TableFontStyle";
import ImageUpload from "./Elements/ImageSettings/ImageUpload";
import RightImageArticleOuterStyle from "./Elements/RightImageArticleSettings/RightImageArticleOuterStyle";
import RightImageArticleTextContent from "./Elements/RightImageArticleSettings/RightImageArticleTextContent";

const Settings = () => {
  const { selectedElement, setSelectedElement } =
    useContext(SelectedElementContext);
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
      setTableCellData(
        selectedElement?.layout[selectedElement?.index]?.cellData[
          selectedTableCell?.row
        ]?.[`col${selectedTableCell?.col}`]
      );
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
      fontWeight: styleValue.includes("bold") ? "bold" : "normal",
      fontStyle: styleValue.includes("italic") ? "italic" : "normal",
      textDecoration: styleValue.includes("strikethrough")
        ? "underline"
        : "none",
    };

    const updatedStyles = {
      ...selectedElement,
      layout: {
        ...selectedElement?.layout,
        [selectedElement?.index]: {
          ...element,
          style: {
            ...element?.style,
            ...changedStyles,
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
  };

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
          },
        },
      },
    };
    setSelectedElement(updatedStyles);
  };

  // Table cell selection
  const onChangeTableCell = (tableCell) => {
    const updateTableCell = {
      ...selectedElement,
      layout: {
        ...selectedElement?.layout,
        [selectedElement?.index]: {
          ...element,
          [Object.keys(tableCell)[0]]: tableCell?.row,
          [Object.keys(tableCell)[1]]: tableCell?.col,
        },
      },
    };
    setSelectedElement(updateTableCell);
  };

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
      fontWeight: styleValue.includes("bold") ? "bold" : "normal",
      fontStyle: styleValue.includes("italic") ? "italic" : "normal",
      textDecoration: styleValue.includes("strikethrough")
        ? "underline"
        : "none",
    };

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
  };

  // Table font size change
  const onTableFontSizeChangeHandle = (fieldName, fieldValue) => {
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

  // Table font case (Uppercase, Lowercase, Capitalize) change
  const onTableFontCaseChangeHandle = (fieldName, fieldValue) => {
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

  // Image Upload Logic
  const onImageUploadHandle = (fieldName, fieldValue) => {
    const updatedContent = { ...selectedElement };
    updatedContent.layout[updatedContent.index][fieldName] = fieldValue;
    setSelectedElement(updatedContent);
  };

  // Image style logic
  const onImageFieldChange = (fieldName, fieldValue) => {
    const updatedStyles = {
      ...selectedElement,
      layout: {
        ...selectedElement?.layout,
        [selectedElement?.index]: {
          ...element,
          style: {
            ...element?.style,
            innerStyle: {
              ...element?.style?.innerStyle,
              [fieldName]: fieldValue,
            },
          },
        },
      },
    };
    setSelectedElement(updatedStyles);
  };

  // RightImageArticle content & image upload
  const onRightImageArticleContentChange = (fieldName, fieldValue) => {
    const updatedContent = { ...selectedElement };
    updatedContent.layout[fieldName] = fieldValue;
    setSelectedElement(updatedContent);
  };
  
  // RightImageArticle line height and font size
  const onRightImageArticleInputFieldChange = (fieldName, fieldValue) => {
    let formattedVal = fieldValue.replace("px", "");

    // Changing line height
    if (fieldName === "lineHeight") {
      if (formattedVal >= 12 && formattedVal <= 50) {
        const updatedStyles = {
          ...selectedElement,
          layout: {
            ...selectedElement?.layout,
            style: {
              ...selectedElement?.layout?.style,
              [fieldName]: fieldValue,
            },
          },
        };
        setSelectedElement(updatedStyles);
      }
    }
    // Changing font size
    if (formattedVal >= 12 && formattedVal <= 24) {
      const updatedStyles = {
        ...selectedElement,
        layout: {
          ...selectedElement?.layout,
          style: {
            ...selectedElement?.layout?.style,
            [fieldName]: fieldValue,
          },
        },
      };
      setSelectedElement(updatedStyles);
    }
  };
  // RightImageArticle font style
  const onRightImageArticleInputFontStyleChange = (styleValue) => {
    const changedStyles = {
      fontWeight: styleValue.includes("bold") ? "bold" : "normal",
      fontStyle: styleValue.includes("italic") ? "italic" : "normal",
      textDecoration: styleValue.includes("strikethrough")
        ? "underline"
        : "none",
    };

    const updatedStyles = {
      ...selectedElement,
      layout: {
        ...selectedElement?.layout,
        style: {
          ...selectedElement?.layout?.style,
          ...changedStyles,
        },
      },
    };
    setSelectedElement(updatedStyles);
  };
  // RightImageArticle font style
  const onRightImageArticleInputFontCaseChange = (fieldName, fieldValue) => {

    const updatedStyles = {
      ...selectedElement,
      layout: {
        ...selectedElement?.layout,
        style: {
          ...selectedElement?.layout?.style,
          [fieldName]:fieldValue,
        },
      },
    };
    setSelectedElement(updatedStyles);
  };
  // RightImageArticle align & background & color style
  const onRightImageArticleAlignStyleChange = (fieldName, fieldValue) => {
    const updatedStyles = {
      ...selectedElement,
      layout: {
        ...selectedElement?.layout,
        style: {
          ...selectedElement?.layout?.style,
          [fieldName]: fieldValue,
        },
      },
    };
    setSelectedElement(updatedStyles);
  };
  // RightImageArticle outer style
  const onRightImageArticleOuterStyleChange = (fieldName, fieldValue) => {
    const updatedStyles = {
      ...selectedElement,
      layout: {
        ...selectedElement?.layout,
        style: {
          ...selectedElement?.layout?.style,
        },
        outerStyle: {
          ...selectedElement?.layout?.outerStyle,
          [fieldName]: fieldValue,
        },
      },
    };
    setSelectedElement(updatedStyles);
  };

  return (
    <div className="h-screen bg-white space-y-5 overflow-y-auto custom-scrollbar p-2">
      <h2 className="mt-2 px-2 font-semibold text-gray-500">Setting</h2>
      <div className="space-y-2">
        {/* Button Content Logic */}
        {element?.content && (
          <InputButton
            label={"Content"}
            fieldName={"content"}
            className="ml-3 form-input"
            elementFieldVal={element?.content}
            onInputContentChange={onInputContentChange}
          />
        )}

        {/* Button Url Logic */}
        {element?.url && (
          <InputButton
            label={"Url"}
            fieldName={"url"}
            className="ml-3 form-input"
            elementFieldVal={element?.url}
            onInputContentChange={onInputContentChange}
          />
        )}

        {/* Button Background Color Logic */}
        {element?.style?.backgroundColor && (
          <InputButtonColor
            label={"Background Color"}
            fieldName={"backgroundColor"}
            elementFieldVal={element?.style?.backgroundColor}
            onInputButtonStyleChangeHandle={onInputButtonStyleChangeHandle}
          />
        )}

        {/* Button Color Logic */}
        {element?.style?.color && (
          <InputButtonColor
            label={"Color"}
            fieldName={"backgroundColor"}
            elementFieldVal={element?.style?.color}
            onInputButtonStyleChangeHandle={onInputButtonStyleChangeHandle}
            />
          )}

        {/* Button Font Size Logic */}
        {element?.style?.fontSize && (
          <InputFieldChange
            label={"Font Size"}
            fieldName={"fontSize"}
            className="ml-3 form-input"
            elementFieldVal={element?.style?.fontSize}
            onInputFieldChange={onInputFieldChange}
          />
        )}

        {/* Button Font Style Logic */}
        {(element?.style?.fontWeight ||
          element?.style?.fontStyle ||
          element?.style?.textDecoration) && (
          <FontStyle
            label={"Font Style"}
            className="ml-3 form-input"
            elementFieldVal={[
              element?.style?.fontWeight,
              element?.style?.fontStyle,
              element?.style?.textDecoration,
            ]}
            onFontStyleChangeHandle={onButtonFontStyleChangeHandle}
          />
        )}

        {/* Button Font Case (Uppercase, Lowercase, Capitalize) Logic */}
        {element?.style?.textTransform && (
          <TableFontStyle
            label={"Font Cases"}
            fieldName={"textTransform"}
            className="ml-3 form-input"
            elementFieldVal={element?.style?.textTransform}
            onFontStyleChangeHandle={onInputFieldChange}
          />
        )}

        {/* Padding Logic */}
        {element?.style?.padding && (
          <InputFieldChange
            label={"Padding"}
            fieldName={"padding"}
            className="ml-3 form-input"
            elementFieldVal={element?.style?.padding}
            onInputFieldChange={onInputFieldChange}
            />
          )}

        {/* Border radius Logic */}
        {element?.type !== "divider" && element?.style?.borderRadius && (
          <InputFieldChange
            label={"Border Radius"}
            fieldName={"borderRadius"}
            className="ml-3 form-input"
            elementFieldVal={element?.style?.borderRadius}
            onInputFieldChange={onInputFieldChange}
            />
          )}

        {/* Button align Logic */}
        {element?.outerStyle?.justifyContent && (
          <InputFieldOuterStyle
            label={"Align Button"}
            fieldName={"justifyContent"}
            className="ml-3 form-input"
            elementFieldVal={element?.outerStyle?.justifyContent}
            onInputFieldOuterStyle={onInputFieldOuterStyle}
          />
        )}

        {/* Table Logic */}
        {element?.type === "table" && (
          <TableEdit
            element={element}
            onChangeTableCell={(row, col) => {
              onChangeTableCell({ row: row, col: col });
            }}
          />
        )}

        {/* Table Style Logic */}
        {element?.type === "table" &&
          element?.cellData &&
          tableCellData?.style?.backgroundColor && (
            <TableCellStyle
              label={"Background Color"}
              fieldName={"backgroundColor"}
              elementFieldVal={tableCellData?.style?.backgroundColor}
              onTableCellStyleChangeHandle={onTableCellStyleChangeHandle}
            />
          )}

        {/* Table Font Style Logic */}
        {element?.type === "table" &&
          element?.cellData &&
          (tableCellData?.style?.fontWeight ||
            tableCellData?.style?.fontStyle ||
            tableCellData?.style?.textDecoration) && (
            <FontStyle
              label={"Font Style"}
              className="ml-3 form-input"
              elementFieldVal={[
                tableCellData?.style?.fontWeight,
                tableCellData?.style?.fontStyle,
                tableCellData?.style?.textDecoration,
              ]}
              onFontStyleChangeHandle={onTableFontStyleChangeHandle}
            />
          )}

        {/* Table Font Case (Uppercase, Lowercase, Capitalize) Logic */}
        {element?.type === "table" &&
          element?.cellData &&
          tableCellData?.style?.textTransform && (
            <TableFontStyle
              label={"Font Cases"}
              fieldName={"textTransform"}
              className="ml-3 form-input"
              elementFieldVal={tableCellData?.style?.textTransform}
              onFontStyleChangeHandle={onTableFontCaseChangeHandle}
            />
          )}

        {/* Table Font Size Logic */}
        {element?.type === "table" &&
          element?.cellData &&
          tableCellData?.style?.fontSize && (
            <InputFieldChange
              label={"Font Size"}
              fieldName={"fontSize"}
              className="ml-3 form-input"
              elementFieldVal={tableCellData?.style?.fontSize}
              onInputFieldChange={onTableFontSizeChangeHandle}
            />
          )}

        {/* Table Padding Logic */}
        {element?.type === "table" &&
          element?.cellData &&
          tableCellData?.style?.padding && (
            <InputFieldChange
              label={"Padding"}
              fieldName={"padding"}
              className="ml-3 form-input"
              elementFieldVal={tableCellData?.style?.padding}
              onInputFieldChange={onTableFontSizeChangeHandle}
            />
          )}

        {/* Image setting logic */}
        {element?.type === "image" && element?.imageUrl && (
          <ImageUpload
            label={"Image"}
            fieldName={"imageUrl"}
            elementFieldVal={element?.imageUrl}
            onImageUploadHandle={onImageUploadHandle}
          />
        )}

        {/* Image border radius logic */}
        {element?.style?.innerStyle?.borderRadius && (
          <InputFieldChange
            label={"Border Radius"}
            fieldName={"borderRadius"}
            className="ml-3 form-input"
            elementFieldVal={element?.style?.innerStyle?.borderRadius}
            onInputFieldChange={onImageFieldChange}
          />
        )}

        {/* Spacer style logic */}
        {element?.type === "spacer" && element?.style?.height && (
          <InputFieldChange
            label={"height"}
            fieldName={"height"}
            className="ml-3 form-input"
            elementFieldVal={element?.style?.height}
            onInputFieldChange={onInputFieldChange}
          />
        )}

        {/* Right image article image upload logic */}
        {selectedElement?.layout?.type === "right-image-article" &&
         selectedElement?.layout?.imageUrl && (
            <ImageUpload
            label={"Image"}
            fieldName={"imageUrl"}
            elementFieldVal={selectedElement?.layout?.imageUrl}
            onImageUploadHandle={onRightImageArticleContentChange}
          />
          )}

        {/* Right image article content logic */}
        {selectedElement?.layout?.type === "right-image-article" &&
          typeof selectedElement?.layout?.content !== "undefined" && (
            <RightImageArticleTextContent
              label={"Content"}
              fieldName={"content"}
              className="ml-3 form-input"
              elementFieldVal={selectedElement?.layout?.content || ""}
              onRightImageArticleContentChange={onRightImageArticleContentChange}
            />
          )}

        {/* Right image background logic */}
        {selectedElement?.layout?.type === "right-image-article" &&
          selectedElement?.layout?.style?.backgroundColor && (
            <InputButtonColor
            label={"Background Color"}
            fieldName={"backgroundColor"}
            elementFieldVal={selectedElement?.layout?.style?.backgroundColor}
            onInputButtonStyleChangeHandle={onRightImageArticleAlignStyleChange}
          />
          )}

        {/* Right image article font size logic */}
        {selectedElement?.layout?.type === "right-image-article" &&
          selectedElement?.layout?.style?.fontSize && (
            <InputFieldChange
              label={"Font Size"}
              fieldName={"fontSize"}
              className="ml-3 form-input"
              elementFieldVal={selectedElement?.layout?.style?.fontSize}
              onInputFieldChange={onRightImageArticleInputFieldChange}
            />
          )}

        {/* Right image article font style logic */}
        {selectedElement?.layout?.type === "right-image-article" &&
          (selectedElement?.layout?.style?.fontWeight ||
            selectedElement?.layout?.style?.fontStyle ||
            selectedElement?.layout?.style?.textDecoration) && (
            <FontStyle
              label={"Font Style"}
              className="ml-3 form-input"
              elementFieldVal={[
                selectedElement?.layout?.style?.fontWeight,
                selectedElement?.layout?.style?.fontStyle,
                selectedElement?.layout?.style?.textDecoration,
              ]}
              onFontStyleChangeHandle={onRightImageArticleInputFontStyleChange}
            />
          )}

        {/* Right image article font case logic */}
        {selectedElement?.layout?.type === "right-image-article" &&
          selectedElement?.layout?.style?.textTransform  && (
            <TableFontStyle
              label={"Font Cases"}
              fieldName={"textTransform"}
              className="ml-3 form-input"
              elementFieldVal={selectedElement?.layout?.style?.textTransform}
              onFontStyleChangeHandle={onRightImageArticleInputFontCaseChange}
            />
          )}

        {/* Right image article align logic */}
        {selectedElement?.layout?.type === "right-image-article" &&
          selectedElement?.layout?.style?.textAlign && (
            <InputFieldOuterStyle
              label={"Align Button"}
              fieldName={"textAlign"}
              className="ml-3 form-input"
              elementFieldVal={selectedElement?.layout?.style?.textAlign}
              onInputFieldOuterStyle={onRightImageArticleAlignStyleChange}
            />
          )}

        {/* Right image article linehight logic */}
        {selectedElement?.layout?.type === "right-image-article" &&
          selectedElement?.layout?.style?.lineHeight && (
            <InputFieldChange
              label={"Line Height"}
              fieldName={"lineHeight"}
              className="ml-3 form-input"
              elementFieldVal={selectedElement?.layout?.style?.lineHeight}
              onInputFieldChange={onRightImageArticleInputFieldChange}
            />
          )}

        {/* Right image article outer style logic */}
        {selectedElement?.layout?.type === "right-image-article" &&
          selectedElement?.layout?.outerStyle?.width && (
            <RightImageArticleOuterStyle
              label={"Width"}
              fieldName={"width"}
              className="ml-3 form-input"
              elementFieldVal={selectedElement?.layout?.outerStyle?.width}
              onRightImageArticleOuterStyleChange={onRightImageArticleOuterStyleChange}
            />
          )}
      </div>
    </div>
  );
};

export default Settings;
