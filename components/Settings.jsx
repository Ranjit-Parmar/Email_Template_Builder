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
import {
  ALargeSmall,
  ArrowLeftSquare,
  ArrowRightSquare,
  LucideCaseLower,
  LucideCaseUpper,
} from "lucide-react";
import HeaderImageToggle from "./Elements/HeaderLayoutSettings/HeaderImageToggle";

const Settings = () => {
  const textTransfromData = [
    {
      icon: <LucideCaseUpper />,
      value: "Uppercase",
    },
    {
      icon: <LucideCaseLower />,
      value: "Lowercase",
    },
    {
      icon: <ALargeSmall />,
      value: "Capitalize",
    },
  ];

  const HeaderImagePositionToggle = [
    {
      icon: <ArrowLeftSquare />,
      value: "left",
    },
    {
      icon: <ArrowRightSquare />,
      value: "right",
    },
  ];

  const { selectedElement, setSelectedElement } = useContext(
    SelectedElementContext
  );
  const { selectedTableCell } = useContext(SelectedTableCellContext);
  const [tableCellData, setTableCellData] = useState();

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
    const element = selectedElement?.layout[selectedElement?.index];
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
    const element = selectedElement?.layout[selectedElement?.index];
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
    const element = selectedElement?.layout[selectedElement?.index];
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
    const element = selectedElement?.layout[selectedElement?.index];
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
    const element = selectedElement?.layout[selectedElement?.index];
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
    const element = selectedElement?.layout[selectedElement?.index];
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
    const element = selectedElement?.layout[selectedElement?.index];
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
    const element = selectedElement?.layout[selectedElement?.index];
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
    const element = selectedElement?.layout[selectedElement?.index];
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
    const element = selectedElement?.layout[selectedElement?.index];
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
    const element = selectedElement?.layout?.style;
    let formattedVal = fieldValue.replace("px", "");

    // Changing line height
    if (fieldName === "lineHeight") {
      if (formattedVal >= 12 && formattedVal <= 50) {
        const updatedStyles = {
          ...selectedElement,
          layout: {
            ...selectedElement?.layout,
            style: {
              ...element,
              [fieldName]: fieldValue,
            },
          },
        };
        setSelectedElement(updatedStyles);
      }
    } else if (fieldName === "fontSize") {
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
    } else if (fieldName === "padding") {
      // Changing padding
      if (formattedVal >= 0 && formattedVal <= 24) {
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
    } else if (fieldName === "gap") {
      // Changing gap
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
    // Changing letter spacing
    if (formattedVal >= 0 && formattedVal <= 12) {
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
    const element = selectedElement?.layout?.style;
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
          ...element,
          ...changedStyles,
        },
      },
    };
    setSelectedElement(updatedStyles);
  };
  // RightImageArticle font style
  const onRightImageArticleInputFontCaseChange = (fieldName, fieldValue) => {
    const element = selectedElement?.layout?.style;
    const updatedStyles = {
      ...selectedElement,
      layout: {
        ...selectedElement?.layout,
        style: {
          ...element,
          [fieldName]: fieldValue,
        },
      },
    };
    setSelectedElement(updatedStyles);
  };
  // RightImageArticle align & background & color style
  const onRightImageArticleAlignStyleChange = (fieldName, fieldValue) => {
    const element = selectedElement?.layout?.style;
    const updatedStyles = {
      ...selectedElement,
      layout: {
        ...selectedElement?.layout,
        style: {
          ...element,
          [fieldName]: fieldValue,
        },
      },
    };
    setSelectedElement(updatedStyles);
  };
  // RightImageArticle outer style
  const onRightImageArticleOuterStyleChange = (fieldName, fieldValue) => {
    const element = selectedElement?.layout;
    const updatedStyles = {
      ...selectedElement,
      layout: {
        ...element,
        style: {
          ...element?.style,
        },
        outerStyle: {
          ...element?.outerStyle,
          [fieldName]: fieldValue,
        },
      },
    };
    setSelectedElement(updatedStyles);
  };

  // Header image upload
  const onHeaderImageChange = (fieldName, fieldValue) => {
    const updatedContent = { ...selectedElement };
    updatedContent.layout[fieldName] = fieldValue;
    setSelectedElement(updatedContent);
  };

  // Header image toggle
  const onHeaderImageToggle = (fieldName, fieldValue) => {
    const element = selectedElement?.layout;
    const updatedContent = {
      ...selectedElement,
      layout: {
        ...element,
        imageStyle: {
          ...element?.imageStyle,
          [fieldName]: fieldValue ? "flex" : "none",
        },
      },
    };
    setSelectedElement(updatedContent);
  };

  // Header image position change
  const onHeaderImagePosition = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
    const element = selectedElement?.layout;
    const updatedContent = {
      ...selectedElement,
      layout: {
        ...element,
        imageStyle: {
          ...element?.imageStyle,
          [fieldName]: fieldValue,
        },
      },
    };
    setSelectedElement(updatedContent);
  };

  // Header image style change
  const onHeaderImageStyleChange = (fieldName, fieldValue) => {
    const element = selectedElement?.layout;
    const updatedContent = {
      ...selectedElement,
      layout: {
        ...element,
        imageStyle: {
          ...element?.imageStyle,
          [fieldName]: fieldValue,
        },
      },
    };
    setSelectedElement(updatedContent);
  };

  // Header background color change
  const onHeaderBackgroundStyle = (fieldName, fieldValue) => {
    const element = selectedElement?.layout;
    const updatedContent = {
      ...selectedElement,
      layout: {
        ...element,
        outerStyle: {
          ...element?.outerStyle,
          [fieldName]: fieldValue,
        },
      },
    };
    setSelectedElement(updatedContent);
  };

  // Header layout font style
  const onHeaderFontTransform = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
    const element = selectedElement?.layout?.outerStyle;
    const updatedStyles = {
      ...selectedElement,
      layout: {
        ...selectedElement?.layout,
        outerStyle: {
          ...element,
          [fieldName]: fieldValue,
        },
      },
    };
    setSelectedElement(updatedStyles);
  };

  // Header layout font style
  const onHeaderFontStyle = (styleValue) => {
    const element = selectedElement?.layout?.outerStyle;
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
        outerStyle: {
          ...element,
          ...changedStyles,
        },
      },
    };
    setSelectedElement(updatedStyles);
  };
  // Header height change
  const onHeaderHeightChange = (fieldName, fieldValue) => {
    const element = selectedElement?.layout;

    if (fieldName === "imageToggle") {
      const updatedContent = {
        ...selectedElement,
        layout: {
          ...element,
          outerStyle: {
            ...element?.outerStyle,
            [fieldName]: fieldValue,
          },
        },
      };
      setSelectedElement(updatedContent);
    } else {
      let formattedVal = fieldValue.replace("px", "");

      if (formattedVal >= 24 && formattedVal <= 100) {
        const updatedContent = {
          ...selectedElement,
          layout: {
            ...element,
            outerStyle: {
              ...element?.outerStyle,
              [fieldName]: fieldValue,
            },
          },
        };
        setSelectedElement(updatedContent);
      }
    }
  };

  return (
    <div className="h-screen bg-white space-y-5 overflow-y-auto custom-scrollbar p-2">
      <h2 className="mt-2 px-2 font-semibold text-gray-500">Setting</h2>
      <div className="space-y-2">
        {/* Button Content Logic */}
        {selectedElement?.layout[selectedElement?.index]?.content && (
          <InputButton
            label={"Content"}
            fieldName={"content"}
            className="ml-3 form-input"
            elementFieldVal={
              selectedElement?.layout[selectedElement?.index]?.content
            }
            onInputContentChange={onInputContentChange}
          />
        )}

        {/* Button Url Logic */}
        {selectedElement?.layout[selectedElement?.index]?.url && (
          <InputButton
            label={"Url"}
            fieldName={"url"}
            className="ml-3 form-input"
            elementFieldVal={
              selectedElement?.layout[selectedElement?.index]?.url
            }
            onInputContentChange={onInputContentChange}
          />
        )}

        {/* Button Background Color Logic */}
        {selectedElement?.layout[selectedElement?.index]?.style
          ?.backgroundColor && (
          <InputButtonColor
            label={"Background Color"}
            fieldName={"backgroundColor"}
            elementFieldVal={
              selectedElement?.layout[selectedElement?.index]?.style
                ?.backgroundColor
            }
            onInputButtonStyleChangeHandle={onInputButtonStyleChangeHandle}
          />
        )}

        {/* Button Color Logic */}
        {selectedElement?.layout[selectedElement?.index]?.type === "button" &&
          selectedElement?.layout[selectedElement?.index]?.style?.color && (
            <InputButtonColor
              label={"Color"}
              fieldName={"color"}
              elementFieldVal={
                selectedElement?.layout[selectedElement?.index]?.style?.color
              }
              onInputButtonStyleChangeHandle={onInputButtonStyleChangeHandle}
            />
          )}

        {/* Button Font Size Logic */}
        {selectedElement?.layout[selectedElement?.index]?.style?.fontSize && (
          <InputFieldChange
            label={"Font Size"}
            fieldName={"fontSize"}
            className="ml-3 form-input"
            elementFieldVal={
              selectedElement?.layout[selectedElement?.index]?.style?.fontSize
            }
            onInputFieldChange={onInputFieldChange}
          />
        )}

        {/* Button Font Style Logic */}
        {(selectedElement?.layout[selectedElement?.index]?.style?.fontWeight ||
          selectedElement?.layout[selectedElement?.index]?.style?.fontStyle ||
          selectedElement?.layout[selectedElement?.index]?.style
            ?.textDecoration) && (
          <FontStyle
            label={"Font Style"}
            className="ml-3 form-input"
            elementFieldVal={[
              selectedElement?.layout[selectedElement?.index]?.style
                ?.fontWeight,
              selectedElement?.layout[selectedElement?.index]?.style?.fontStyle,
              selectedElement?.layout[selectedElement?.index]?.style
                ?.textDecoration,
            ]}
            onFontStyleChangeHandle={onButtonFontStyleChangeHandle}
          />
        )}

        {/* Button Font Case (Uppercase, Lowercase, Capitalize) Logic */}
        {selectedElement?.layout[selectedElement?.index]?.style
          ?.textTransform && (
          <TableFontStyle
            label={"Font Cases"}
            fieldName={"textTransform"}
            options={textTransfromData}
            className="ml-3 form-input"
            elementFieldVal={
              selectedElement?.layout[selectedElement?.index]?.style
                ?.textTransform
            }
            onFontStyleChangeHandle={onInputFieldChange}
          />
        )}

        {/* Padding Logic */}
        {selectedElement?.layout[selectedElement?.index]?.style?.padding && (
          <InputFieldChange
            label={"Padding"}
            fieldName={"padding"}
            className="ml-3 form-input"
            elementFieldVal={
              selectedElement?.layout[selectedElement?.index]?.style?.padding
            }
            onInputFieldChange={onInputFieldChange}
          />
        )}

        {/* Border radius Logic */}
        {selectedElement?.layout[selectedElement?.index]?.type !== "divider" &&
          selectedElement?.layout[selectedElement?.index]?.style
            ?.borderRadius && (
            <InputFieldChange
              label={"Border Radius"}
              fieldName={"borderRadius"}
              className="ml-3 form-input"
              elementFieldVal={
                selectedElement?.layout[selectedElement?.index]?.style
                  ?.borderRadius
              }
              onInputFieldChange={onInputFieldChange}
            />
          )}

        {/* Button align Logic */}
        {selectedElement?.layout[selectedElement?.index]?.outerStyle
          ?.justifyContent && (
          <InputFieldOuterStyle
            label={"Align Button"}
            fieldName={"justifyContent"}
            className="ml-3 form-input"
            elementFieldVal={
              selectedElement?.layout[selectedElement?.index]?.outerStyle
                ?.justifyContent
            }
            onInputFieldOuterStyle={onInputFieldOuterStyle}
          />
        )}

        {/* Table Logic */}
        {selectedElement?.layout[selectedElement?.index]?.type === "table" && (
          <TableEdit
            element={selectedElement?.layout[selectedElement?.index]}
            onChangeTableCell={(row, col) => {
              onChangeTableCell({ row: row, col: col });
            }}
          />
        )}

        {/* Table Background Color Style Logic */}
        {selectedElement?.layout[selectedElement?.index]?.type === "table" &&
          selectedElement?.layout[selectedElement?.index]?.cellData &&
          tableCellData?.style?.backgroundColor && (
            <TableCellStyle
              label={"Background Color"}
              fieldName={"backgroundColor"}
              elementFieldVal={tableCellData?.style?.backgroundColor}
              onTableCellStyleChangeHandle={onTableCellStyleChangeHandle}
            />
          )}

        {/* Table Font Style Logic */}
        {selectedElement?.layout[selectedElement?.index]?.type === "table" &&
          selectedElement?.layout[selectedElement?.index]?.cellData &&
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
        {selectedElement?.layout[selectedElement?.index]?.type === "table" &&
          selectedElement?.layout[selectedElement?.index]?.cellData &&
          tableCellData?.style?.textTransform && (
            <TableFontStyle
              label={"Font Cases"}
              fieldName={"textTransform"}
              options={textTransfromData}
              className="ml-3 form-input"
              elementFieldVal={tableCellData?.style?.textTransform}
              onFontStyleChangeHandle={onTableFontCaseChangeHandle}
            />
          )}

        {/* Table Font Size Logic */}
        {selectedElement?.layout[selectedElement?.index]?.type === "table" &&
          selectedElement?.layout[selectedElement?.index]?.cellData &&
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
        {selectedElement?.layout[selectedElement?.index]?.type === "table" &&
          selectedElement?.layout[selectedElement?.index]?.cellData &&
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
        {selectedElement?.layout[selectedElement?.index]?.type === "image" &&
          selectedElement?.layout[selectedElement?.index]?.imageUrl && (
            <ImageUpload
              label={"Image"}
              fieldName={"imageUrl"}
              elementFieldVal={
                selectedElement?.layout[selectedElement?.index]?.imageUrl
              }
              onImageUploadHandle={onImageUploadHandle}
            />
          )}

        {/* Image border radius logic */}
        {selectedElement?.layout[selectedElement?.index]?.style?.innerStyle
          ?.borderRadius && (
          <InputFieldChange
            label={"Border Radius"}
            fieldName={"borderRadius"}
            className="ml-3 form-input"
            elementFieldVal={
              selectedElement?.layout[selectedElement?.index]?.style?.innerStyle
                ?.borderRadius
            }
            onInputFieldChange={onImageFieldChange}
          />
        )}

        {/* Spacer style logic */}
        {selectedElement?.layout[selectedElement?.index]?.type === "spacer" &&
          selectedElement?.layout[selectedElement?.index]?.style?.height && (
            <InputFieldChange
              label={"height"}
              fieldName={"height"}
              className="ml-3 form-input"
              elementFieldVal={
                selectedElement?.layout[selectedElement?.index]?.style?.height
              }
              onInputFieldChange={onInputFieldChange}
            />
          )}

        {/* Right image article image upload logic */}
        {(selectedElement?.layout?.type === "right-image-article" ||
          selectedElement?.layout?.type === "left-image-article") &&
          selectedElement?.layout?.imageUrl && (
            <ImageUpload
              label={"Image"}
              fieldName={"imageUrl"}
              elementFieldVal={selectedElement?.layout?.imageUrl}
              onImageUploadHandle={onRightImageArticleContentChange}
            />
          )}

        {/* Right image article content logic */}
        {(selectedElement?.layout?.type === "right-image-article" ||
          selectedElement?.layout?.type === "left-image-article" ||
          selectedElement?.layout?.type === "heading") &&
          typeof selectedElement?.layout?.content !== "undefined" && (
            <RightImageArticleTextContent
              label={"Content"}
              fieldName={"content"}
              className="ml-3 form-input"
              elementFieldVal={selectedElement?.layout?.content || ""}
              onRightImageArticleContentChange={
                onRightImageArticleContentChange
              }
            />
          )}

        {/* Right image article background color logic */}
        {(selectedElement?.layout?.type === "right-image-article" ||
          selectedElement?.layout?.type === "left-image-article") &&
          selectedElement?.layout?.style?.backgroundColor && (
            <InputButtonColor
              label={"Background Color"}
              fieldName={"backgroundColor"}
              elementFieldVal={selectedElement?.layout?.style?.backgroundColor}
              onInputButtonStyleChangeHandle={
                onRightImageArticleAlignStyleChange
              }
            />
          )}

        {/* Right image article color logic */}
        {(selectedElement?.layout?.type === "right-image-article" ||
          selectedElement?.layout?.type === "left-image-article" ||
          selectedElement?.layout?.type === "heading") &&
          selectedElement?.layout?.style?.color && (
            <InputButtonColor
              label={"Color"}
              fieldName={"color"}
              elementFieldVal={selectedElement?.layout?.style?.color}
              onInputButtonStyleChangeHandle={
                onRightImageArticleAlignStyleChange
              }
            />
          )}

        {/* Right image article font size logic */}
        {(selectedElement?.layout?.type === "right-image-article" ||
          selectedElement?.layout?.type === "left-image-article" ||
          selectedElement?.layout?.type === "heading") &&
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
        {(selectedElement?.layout?.type === "right-image-article" ||
          selectedElement?.layout?.type === "left-image-article" ||
          selectedElement?.layout?.type === "heading") &&
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
        {(selectedElement?.layout?.type === "right-image-article" ||
          selectedElement?.layout?.type === "left-image-article" ||
          selectedElement?.layout?.type === "heading") &&
          selectedElement?.layout?.style?.textTransform && (
            <TableFontStyle
              label={"Font Cases"}
              fieldName={"textTransform"}
              options={textTransfromData}
              className="ml-3 form-input"
              elementFieldVal={selectedElement?.layout?.style?.textTransform}
              onFontStyleChangeHandle={onRightImageArticleInputFontCaseChange}
            />
          )}

        {/* Right image article align logic */}
        {(selectedElement?.layout?.type === "right-image-article" ||
          selectedElement?.layout?.type === "left-image-article") &&
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
        {(selectedElement?.layout?.type === "right-image-article" ||
          selectedElement?.layout?.type === "left-image-article") &&
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
        {(selectedElement?.layout?.type === "right-image-article" ||
          selectedElement?.layout?.type === "left-image-article") &&
          selectedElement?.layout?.outerStyle?.width && (
            <RightImageArticleOuterStyle
              label={"Width"}
              fieldName={"width"}
              className="ml-3 form-input"
              elementFieldVal={selectedElement?.layout?.outerStyle?.width}
              onRightImageArticleOuterStyleChange={
                onRightImageArticleOuterStyleChange
              }
            />
          )}

        {/* Header image style logic */}
        {selectedElement?.layout?.type === "header" &&
          selectedElement?.layout?.imageUrl && (
            <ImageUpload
              label={"Image"}
              fieldName={"imageUrl"}
              elementFieldVal={selectedElement?.layout?.imageUrl}
              onImageUploadHandle={onHeaderImageChange}
            />
          )}

        {/* Header image toggle logic */}
        {selectedElement?.layout?.type === "header" &&
          selectedElement?.layout?.imageStyle?.display && (
            <HeaderImageToggle
              label={"Image Toggle"}
              fieldName={"display"}
              elementFieldVal={selectedElement?.layout?.imageStyle?.display}
              onToggleHandle={onHeaderImageToggle}
            />
          )}

        {/* Header image border radius style logic */}
        {selectedElement?.layout?.type === "header" &&
          selectedElement?.layout?.imageStyle?.borderRadius && (
            <InputFieldChange
              label={"Image Radius"}
              fieldName={"borderRadius"}
              className="ml-3 form-input"
              elementFieldVal={
                selectedElement?.layout?.imageStyle?.borderRadius
              }
              onInputFieldChange={onHeaderImageStyleChange}
            />
          )}

        {/* Header height style logic */}
        {selectedElement?.layout?.type === "header" &&
          selectedElement?.layout?.outerStyle?.height && (
            <InputFieldChange
              label={"Height"}
              fieldName={"height"}
              className="ml-3 form-input"
              elementFieldVal={selectedElement?.layout?.outerStyle?.height}
              onInputFieldChange={onHeaderHeightChange}
            />
          )}

        {/* Header background color style logic */}
        {selectedElement?.layout?.type === "header" &&
          selectedElement?.layout?.outerStyle?.backgroundColor && (
            <InputButtonColor
              label={"Background Color"}
              fieldName={"backgroundColor"}
              elementFieldVal={
                selectedElement?.layout?.outerStyle?.backgroundColor
              }
              onInputButtonStyleChangeHandle={onHeaderBackgroundStyle}
            />
          )}

        {/* Header color style logic */}
        {selectedElement?.layout?.type === "header" &&
          selectedElement?.layout?.outerStyle?.color && (
            <InputButtonColor
              label={"Color"}
              fieldName={"color"}
              elementFieldVal={selectedElement?.layout?.outerStyle?.color}
              onInputButtonStyleChangeHandle={onHeaderBackgroundStyle}
            />
          )}

        {/* Header font style logic */}
        {selectedElement?.layout?.type === "header" &&
          (selectedElement?.layout?.outerStyle?.fontWeight ||
            selectedElement?.layout?.outerStyle?.fontStyle ||
            selectedElement?.layout?.outerStyle?.textDecoration) && (
            <FontStyle
              label={"Font Style"}
              className="ml-3 form-input"
              elementFieldVal={[
                selectedElement?.layout?.outerStyle?.fontWeight,
                selectedElement?.layout?.outerStyle?.fontStyle,
                selectedElement?.layout?.outerStyle?.textDecoration,
              ]}
              onFontStyleChangeHandle={onHeaderFontStyle}
            />
          )}

        {/* Header font case logic */}
        {selectedElement?.layout?.type === "header" &&
          selectedElement?.layout?.outerStyle?.textTransform && (
            <TableFontStyle
              label={"Font Cases"}
              fieldName={"textTransform"}
              options={textTransfromData}
              className="ml-3 form-input"
              elementFieldVal={
                selectedElement?.layout?.outerStyle?.textTransform
              }
              onFontStyleChangeHandle={onHeaderFontTransform}
            />
          )}

        {/* Header image position style logic */}
        {selectedElement?.layout?.type === "header" &&
          selectedElement?.layout?.imageStyle?.position && (
            <TableFontStyle
              label={"Position"}
              fieldName={"position"}
              options={HeaderImagePositionToggle}
              className="ml-3 form-input"
              elementFieldVal={selectedElement?.layout?.imageStyle?.position}
              onFontStyleChangeHandle={onHeaderImagePosition}
            />
          )}

        {/* Header font size logic */}
        {selectedElement?.layout?.type === "header" &&
          selectedElement?.layout?.outerStyle?.fontSize && (
            <InputFieldChange
              label={"Font Size"}
              fieldName={"fontSize"}
              className="ml-3 form-input"
              elementFieldVal={selectedElement?.layout?.outerStyle?.fontSize}
              onInputFieldChange={onHeaderBackgroundStyle}
            />
          )}
        {/* Header gap style logic */}
        {selectedElement?.layout?.type === "header" &&
          selectedElement?.layout?.style?.gap && (
            <InputFieldChange
              label={"Gap"}
              fieldName={"gap"}
              className="ml-3 form-input"
              elementFieldVal={selectedElement?.layout?.style?.gap}
              onInputFieldChange={onRightImageArticleInputFieldChange}
            />
          )}

        {/* Header letter spacing style logic */}
        {selectedElement?.layout?.type === "header" &&
          selectedElement?.layout?.style?.letterSpacing && (
            <InputFieldChange
              label={"Letter Spacing"}
              fieldName={"letterSpacing"}
              className="ml-3 form-input"
              elementFieldVal={selectedElement?.layout?.style?.letterSpacing}
              onInputFieldChange={onRightImageArticleInputFieldChange}
            />
          )}
      </div>
    </div>
  );
};

export default Settings;
