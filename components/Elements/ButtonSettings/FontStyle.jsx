import { Bold, Italic, Underline } from "lucide-react"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { useEffect, useState } from "react";

const FontStyle = ({ label, elementFieldVal, onFontStyleChangeHandle }) => {
  const [fontStyleArr, setFontStyleArr] = useState([]);

  useEffect(() => {

    const updatedFontStyleArr = [];
    
    elementFieldVal?.forEach((val) => {
      if (val === 'bold') {
        updatedFontStyleArr.push('bold');
      }
      if (val === 'italic') {
        updatedFontStyleArr.push('italic');
      }
      if (val === 'underline') {
        updatedFontStyleArr.push('strikethrough');
      }
    });

    setFontStyleArr(updatedFontStyleArr);
  }, [elementFieldVal]);

  return (
    <div className="text-sm font-medium text-gray-700">
      <span>{label} :</span>
      <ToggleGroup 
        type="multiple" 
        variant="outline"
        value={fontStyleArr} 
        onValueChange={(e) => onFontStyleChangeHandle(e)} 
      >
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default FontStyle;
