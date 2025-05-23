import Image from "next/image";
import React, { useContext, useEffect } from "react";
import { SelectedElementContext } from "@/context/SelectedElement";

const HeaderLayout = ({ layout }) => {
  const {
    selectedElement,
    setSelectedElement,
    setSelectedHeader,
    setSelectedHeading,
    setSelectedLeftImageArticle,
    setSelectedRightImageArticle,
    selectedHeading,
    selectedLeftImageArticle,
    selectedRightImageArticle,
  } = useContext(SelectedElementContext);

  // Clear header selection when any specific element is selected
  useEffect(() => {
    if (
      selectedElement ||
      selectedHeading ||
      selectedLeftImageArticle ||
      selectedRightImageArticle
    ) {
      setSelectedHeader();
    }
  }, [
    selectedElement,
    selectedHeading,
    selectedLeftImageArticle,
    selectedRightImageArticle,
  ]);

  const handleClick = () => {
    setSelectedHeader();
    setSelectedElement({ layout, id: layout?.id });
    setSelectedHeading();
    setSelectedLeftImageArticle();
    setSelectedRightImageArticle();
  };

  const isSelected =
    layout?.type === selectedElement?.layout?.type &&
    layout?.id === selectedElement?.layout?.id;

  return (
    <table
    style={layout?.outerStyle}
      className={` w-full cursor-pointer transition-shadow ${
        isSelected ? "ring-2 ring-cyan-500 shadow-md" : "hover:shadow"
      }`}
      cellPadding="0"
      cellSpacing="0"
      onClick={handleClick}
    >
      <tbody style={{width: '100%'}}>
        <tr style={layout?.outerStyle}>
          {layout?.imageStyle?.position === "left" && layout?.imageUrl && (
            <td className="p-1">
              <Image
                className="rounded h-full "
                src={layout.imageUrl}
                width={50}
                height={50}
                alt="logo"
              />
            </td>
          )}

          <td className="p-2 space-x-8 w-full flex justify-center items-center">
            {layout?.links?.map((link, i) => (
              <a
                key={i}
                href="#"
                style={layout?.style}
              >
                {link}
              </a>
            ))}
          </td>

          {layout?.imageStyle?.position === "right" && layout?.imageUrl && (
            <td className="p-1">
              <Image
                className="rounded h-full"
                src={layout.imageUrl}
                width={50}
                height={50}
                alt="logo"
              />
            </td>
          )}
        </tr>
      </tbody>
    </table>
  );
};

export default HeaderLayout;
