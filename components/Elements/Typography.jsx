import React, { useContext, useEffect, useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { SelectedElementContext } from '@/context/SelectedElement';

const Typography = ({ element, contentValue }) => {

  const { selectedElement, setSelectedElement } = useContext(SelectedElementContext);
  const [typographyValue, setTypographyValue] = useState(element?.contentValue || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      const updatedContent = { ...selectedElement };
      if (updatedContent.layout && updatedContent.layout[updatedContent.index]) {
        updatedContent.layout[updatedContent.index]["contentValue"] = typographyValue;
        setSelectedElement(updatedContent);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [typographyValue]);

  const onInputContentChange = (value) => {
    setTypographyValue(value);
  };

  return (
    <div className="bg-white w-full h-full">
      <Textarea
        placeholder="Type your message here."
        value={typographyValue}
        style={element?.style}
        className="border-transparent hover:border hover:resize resize-none p-2 text-base outline-none w-full h-full"
        onChange={(e) => onInputContentChange(e.target.value)}
      />
    </div>
  );
};

export default Typography;
