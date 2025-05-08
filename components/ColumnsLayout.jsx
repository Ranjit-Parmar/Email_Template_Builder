import { ElementContext } from "@/context/ElementContext";
import { LayoutContext } from "@/context/LayoutContext";
import React, { useContext, useState, useEffect, useRef } from "react";
import Button from "./Elements/Button";
import Typography from "./Elements/Typography";
import DataTable from "./Elements/Table";
import ImageElement from "./Elements/Image";
import Divider from "./Elements/Divider";
import Spacer from "./Elements/Spacer";
import { SelectedElementContext } from "@/context/SelectedElement";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";

const ColumnsLayout = ({ layout }) => {
  
  const panelRef = useRef();
  const [dragOver, setDragOver] = useState();
  const [isDraggingElement, setIsDraggingElement] = useState(false);
  const { setLayoutDataArray } = useContext(LayoutContext);
  const { elementDataObj } = useContext(ElementContext);
  const { selectedElement, setSelectedElement } = useContext(SelectedElementContext);

  // Normalize panel sizes to ensure they sum to 100%
  const normalizePanelSizes = (sizes) => {

    const total = sizes.reduce((sum, size) => sum + size, 0);
    if (total === 100) return sizes;

    // Calculate the adjustment to make the total sum exactly 100%
    const adjustment = 100 - total;
    const adjustedSizes = sizes.map((size) => size + (adjustment / sizes.length));

    // Round to avoid floating-point errors
    return adjustedSizes.map((size) => Math.round(size * 100) / 100);
  };

  // Function to retrieve panel sizes from localStorage or use default values
  const getSavedPanelSizes = () => {
    try {
      const savedSizes = localStorage.getItem(`panelSizes-${layout.id}`);
      const parsedSizes = savedSizes ? JSON.parse(savedSizes) : null;

      if (Array.isArray(parsedSizes) && parsedSizes.length === layout?.numOfColumns) {
        return normalizePanelSizes(parsedSizes);
      }
    } catch (error) {
      console.error("Error parsing panel sizes from localStorage", error);
    }

    // Return default values if no valid data is found, normalize the default sizes
    return normalizePanelSizes(Array.from({ length: layout?.numOfColumns }).map(() => 100 / layout?.numOfColumns));
  };

  // Initialize state with saved panel sizes from localStorage
  const [panelSizes, setPanelSizes] = useState(getSavedPanelSizes);

  // Store panel sizes in localStorage whenever panelSizes changes
  useEffect(() => {
    if (panelSizes && panelSizes.length > 0) {
      // Update the localStorage with the latest panel sizes
      localStorage.setItem(`panelSizes-${layout.id}`, JSON.stringify(panelSizes));
    }
  }, [panelSizes, layout.id]); // Trigger when panelSizes or layout.id change

  // Handle resizing of a panel
  const handleResize = (newSize, index) => {
    const newPanelSizes = [...panelSizes];
    newPanelSizes[index] = newSize;
    setPanelSizes(normalizePanelSizes(newPanelSizes)); // Normalize sizes after resize
  };

  // On Drag Over Handler
  const onDragOverHandle = (event, index) => {
    event.preventDefault();
    if (elementDataObj?.dragValue) {
      setIsDraggingElement(true);
      setDragOver({
        index: index,
        columnId: layout?.id,
      });
    }
  };

  // On Drag Leave Handler
  const onDragLeaveHandle = () => {
    setIsDraggingElement(false);
  };

  // On Drop Handler
  const onDropHandle = () => {

    const index = dragOver?.index;
    setLayoutDataArray((prevItem) =>
      prevItem?.map((col) =>
        col.id === layout?.id
          ? { ...col, [index]: elementDataObj?.dragValue }
          : col
      )
    );
    setDragOver(null);
    setIsDraggingElement(false);
  };

  // Render the element based on the type
  const GetElementComponent = (element) => {
    if (element?.type === "button") {
      return <Button element={element} />;
    } else if (element?.type === "table") {
      return <DataTable element={element} />;
    } else if (element?.type === "image") {
      return <ImageElement element={element} />;
    } else if (element?.type === "typography") {
      return <Typography element={element} />;
    } else if (element?.type === "divider") {
      return <Divider element={element} />;
    } else if (element?.type === "spacer") {
      return <Spacer element={element} />;
    }
    return element?.type;
  };

  return (
    <div>
      <ResizablePanelGroup
        direction="horizontal"
        style={{
          display: "flex",
          gap: "0px",
        }}
        className="group"
      >
        {Array.from({ length: layout?.numOfColumns }).map((_, index) => (
          <React.Fragment key={index}>
            <ResizablePanel
              key={index}
              ref={panelRef}
              defaultSize={panelSizes[index]} // Controlled size for the panel
              minSize={layout.numOfColumns === 4 ? 20 : 25}
              onResize={(newSize) => handleResize(newSize, index)} // Handle resize
              className={`p-2 flex items-center h-full w-full bg-white cursor-pointer
              ${!layout?.[index]?.type && "bg-gray-100 border border-dashed"}  justify-center
              ${index == dragOver?.index && dragOver?.columnId && isDraggingElement && "!bg-blue-100"}
              ${selectedElement?.layout?.id == layout?.id && selectedElement?.index == index && "border-blue-500 border"}`}
              onDragOver={(event) => onDragOverHandle(event, index)}
              onDragLeave={onDragLeaveHandle}
              onDrop={onDropHandle}
              onClick={() =>
                setSelectedElement({ layout: layout, index: index })
              }
            >
              {GetElementComponent(layout?.[index]) ?? "Drag Element Here"}
            </ResizablePanel>
            {index !== layout.numOfColumns - 1 && (
              <ResizableHandle
                withHandle
                className="opacity-0 group-hover:opacity-100 w-0"
              />
            )}
          </React.Fragment>
        ))}
      </ResizablePanelGroup>
    </div>
  );
};

export default ColumnsLayout;
