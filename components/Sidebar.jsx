"use client";
import React, { useContext } from "react";
import { ImageIcon } from "lucide-react";
// layout data imports
import column1 from "@/public/column1.png";
import column2 from "@/public/column2.png";
import column3 from "@/public/column3.png";
import column4 from "@/public/column4.png";
import layout1 from "@/public/layout1.png";
import layout2 from "@/public/layout2.png";
import layout3 from "@/public/layout3.png";
import heading from "@/public/heading.png";
import LayoutCard from "./LayoutCard";

// element data imports
import button from "@/public/button.png";
import spacer from "@/public/spacer.png";
import table from "@/public/Table.png";
import image from "@/public/hero.png";
import text from "@/public/Text.png";
import divider from "@/public/Divider.png";
import ElementCard from "./ElementCard";
import { LayoutContext } from "@/context/LayoutContext";
import { ElementContext } from "@/context/ElementContext";

const LayoutData = [
  {
    label: "Single column",
    type: "column",
    numOfColumns: 1,
    icon: column1,
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f3f4f6",
    },
  },
  {
    label: "Two columns",
    type: "column",
    numOfColumns: 2,
    icon: column2,
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f3f4f6",
    },
  },
  {
    label: "Three column",
    type: "column",
    numOfColumns: 3,
    icon: column3,
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f3f4f6",
    },
  },
  {
    label: "Four column",
    type: "column",
    numOfColumns: 4,
    icon: column4,
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f3f4f6",
    },
  },
  {
    label: "Heading",
    type: "heading",
    icon: heading,
  },
  {
    label: "Article 1",
    type: "right-image-article",
    icon: layout1,
    imageUrl: image,
    alt: "Image",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa, voluptatum. Molestiae quos quaerat, quas at officia, itaque corrupti quod possimus commodi saepe ipsa dolore. Quo quasi repellendus cum et voluptates distinctio ab quibusdam unde laborum corrupti eos, ex ea quam iusto neque, amet voluptatem ratione voluptas?",
    style: {
      fontSize: "16px",
      fontWeight: "normal",
      fontStyle: "normal",
      textDecoration: "none",
      textTransform: "Capitalize",
      lineHeight: "24px",
      backgroundColor: "#ffffff",
      color: "#000000",
      padding: "4px",
      marginTop: "0px",
      marginBottom: "0px",
      textAlign: "center",
      wordBreak: "break-word",
      overflow: "hidden",
    },
    outerStyle: {
      width: "100%",
    },
  },
  {
    label: "Article 2",
    type: "left-image-article",
    icon: layout2,
    imageUrl: image,
    alt: "Image",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa, voluptatum. Molestiae quos quaerat, quas at officia, itaque corrupti quod possimus commodi saepe ipsa dolore. Quo quasi repellendus cum et voluptates distinctio ab quibusdam unde laborum corrupti eos, ex ea quam iusto neque, amet voluptatem ratione voluptas?",
    style: {
      fontSize: "16px",
      fontWeight: "normal",
      fontStyle: "normal",
      textDecoration: "none",
      textTransform: "Capitalize",
      lineHeight: "24px",
      backgroundColor: "#ffffff",
      color: "#000000",
      padding: "4px",
      marginTop: "0px",
      marginBottom: "0px",
      textAlign: "center",
      wordBreak: "break-word",
      overflow: "hidden",
    },
    outerStyle: {
      width: "100%",
    },
  },
  {
    label: "Header",
    type: "header",
    icon: layout3,
  },
];

const ElementData = [
  {
    label: "Button",
    type: "button",
    content: "Click here",
    url: "#",
    icon: button,
    style: {
      padding: "12px",
      backgroundColor: "#2563eb",
      color: "#ffffff",
      width: "auto",
      fontSize: "16px",
      textAlign: "center",
      fontWeight: "bold",
      fontStyle: "normal",
      textDecoration: "none",
      textTransform: "Capitalize",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      color: "#ffffff",
      borderRadius: "10px",
      objectFit: "contain",
    },
    outerStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "auto",
      backgroundColor: "#ffffff",
    },
  },
  {
    label: "Table",
    type: "table",
    icon: table,
    row: 4,
    col: 4,
    cellData: [
      {
        col0: {
          value: "First Name",
          style: {
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "4px",
            fontSize: "13px",
            fontWeight: "bold",
            fontStyle: "normal",
            textDecoration: "none",
            textTransform: "Capitalize",
          },
        },
        col1: {
          value: "Emily",
          style: {
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "4px",
            fontSize: "13px",
            fontWeight: "normal",
            fontStyle: "normal",
            textDecoration: "none",
            textTransform: "Capitalize",
          },
        },
        col2: {
          value: "Grace",
          style: {
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "4px",
            fontSize: "13px",
            fontWeight: "normal",
            fontStyle: "normal",
            textDecoration: "none",
            textTransform: "Capitalize",
          },
        },
        col3: {
          value: "Thompson",
          style: {
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "4px",
            fontSize: "13px",
            fontWeight: "normal",
            fontStyle: "normal",
            textDecoration: "none",
            textTransform: "Capitalize",
          },
        },
        col4: {
          value: "USA",
          style: {
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "4px",
            fontSize: "13px",
            fontWeight: "normal",
            fontStyle: "normal",
            textDecoration: "none",
            textTransform: "Uppercase",
          },
        },
      },
      {
        col0: {
          value: "Middle Name",
          style: {
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "4px",
            fontSize: "13px",
            fontWeight: "bold",
            fontStyle: "normal",
            textDecoration: "none",
            textTransform: "Capitalize",
          },
        },
        col1: {
          value: "Michael",
          style: {
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "4px",
            fontSize: "13px",
            fontWeight: "normal",
            fontStyle: "normal",
            textDecoration: "none",
            textTransform: "Capitalize",
          },
        },
        col2: {
          value: "James",
          style: {
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "4px",
            fontSize: "13px",
            fontWeight: "normal",
            fontStyle: "normal",
            textDecoration: "none",
            textTransform: "Capitalize",
          },
        },
        col3: {
          value: "Andreson",
          style: {
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "4px",
            fontSize: "13px",
            fontWeight: "normal",
            fontStyle: "normal",
            textDecoration: "none",
            textTransform: "Capitalize",
          },
        },
        col4: {
          value: "USA",
          style: {
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "4px",
            fontSize: "13px",
            fontWeight: "normal",
            fontStyle: "normal",
            textDecoration: "none",
            textTransform: "Uppercase",
          },
        },
      },
      {
        col0: {
          value: "Last Name",
          style: {
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "4px",
            fontSize: "13px",
            fontWeight: "bold",
            fontStyle: "normal",
            textDecoration: "none",
            textTransform: "Capitalize",
          },
        },
        col1: {
          value: "Sarah",
          style: {
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "4px",
            fontSize: "13px",
            fontWeight: "normal",
            fontStyle: "normal",
            textDecoration: "none",
            textTransform: "Capitalize",
          },
        },
        col2: {
          value: "Elizabeth",
          style: {
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "4px",
            fontSize: "13px",
            fontWeight: "normal",
            fontStyle: "normal",
            textDecoration: "none",
            textTransform: "Capitalize",
          },
        },
        col3: {
          value: "Miller",
          style: {
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "4px",
            fontSize: "13px",
            fontWeight: "normal",
            fontStyle: "normal",
            textDecoration: "none",
            textTransform: "Capitalize",
          },
        },
        col4: {
          value: "USA",
          style: {
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "4px",
            fontSize: "13px",
            fontWeight: "normal",
            fontStyle: "normal",
            textDecoration: "none",
            textTransform: "Uppercase",
          },
        },
      },
      {
        col0: {
          value: "Address",
          style: {
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "4px",
            fontSize: "13px",
            fontWeight: "bold",
            fontStyle: "normal",
            textDecoration: "none",
            textTransform: "Capitalize",
          },
        },
        col1: {
          value: "Jason",
          style: {
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "4px",
            fontSize: "13px",
            fontWeight: "normal",
            fontStyle: "normal",
            textDecoration: "none",
            textTransform: "Capitalize",
          },
        },
        col2: {
          value: "Lee",
          style: {
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "4px",
            fontSize: "13px",
            fontWeight: "normal",
            fontStyle: "normal",
            textDecoration: "none",
            textTransform: "Capitalize",
          },
        },
        col3: {
          value: "Harris",
          style: {
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "4px",
            fontSize: "13px",
            fontWeight: "normal",
            fontStyle: "normal",
            textDecoration: "none",
            textTransform: "Capitalize",
          },
        },
        col4: {
          value: "USA",
          style: {
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "4px",
            fontSize: "13px",
            fontWeight: "normal",
            fontStyle: "normal",
            textDecoration: "none",
            textTransform: "Uppercase",
          },
        },
      },
    ],
  },
  {
    label: "Image",
    type: "image",
    icon: image,
    imageUrl: image,
    alt: "Image",
    url: "",
    style: {
      innerStyle: {
        width: "auto",
        height: "auto",
        objectFit: "cover",
        borderRadius: "10px",
      },
      outerStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "auto",
        backgroundColor: "#FFFFFF",
      },
    },
  },
  {
    label: "Typography",
    type: "typography",
    icon: text,
    style: {
      fontSize: "20px",
      fontWeight: "600",
      marginBottom: "16px",
      lineHeight: "1.6",
      color: "#333",
      fontFamily: "'Inter', sans-serif",
      letterSpacing: "0.5px",
    },
  },
  {
    label: "Divider",
    type: "divider",
    icon: divider,
    style: {
      height: "2px",
      width: "100%",
      backgroundColor: "black",
    },
  },
  {
    label: "Spacer",
    type: "spacer",
    icon: spacer,
    style: {
      height: "10px",
    },
  },
];

const Sidebar = () => {
  const { setLayoutDataObj } = useContext(LayoutContext);
  const { setElementDataObj } = useContext(ElementContext);

  const onDragStartLayoutHandle = (layout) => {
    setLayoutDataObj({
      dragValue: {
        ...layout,
        id: Date.now(),
      },
    });
    setElementDataObj(null);
  };
  const onDragStartElementHandle = (element) => {
    setElementDataObj({
      dragValue: {
        ...element,
        id: Date.now(),
      },
    });
    setLayoutDataObj(null);
  };

  return (
    <div className="border h-screen overflow-y-auto p-2 custom-scrollbar">
      <h2 className="mt-2 px-2 font-semibold text-gray-500">Layout</h2>
      <div className="grid grid-cols-2 gap-2">
        {LayoutData?.map((layout, i) => {
          return (
            <div
              key={i}
              draggable
              onDragStart={() => onDragStartLayoutHandle(layout)}
            >
              <LayoutCard layout={layout} />
            </div>
          );
        })}
      </div>
      <hr className="mt-2" />
      <h2 className="mt-2 px-2 font-semibold text-gray-500">Element</h2>
      <div className="grid grid-cols-2 gap-2">
        {ElementData?.map((element, i) => {
          return (
            <div
              key={i}
              draggable
              onDragStart={() => onDragStartElementHandle(element)}
            >
              <ElementCard element={element} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
