import { Bold, Italic, Underline } from "lucide-react"
 
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { useEffect } from "react";

const FontStyle = ({ label, elementFieldVal, onFontStyleChangeHandle }) => {
    const fontStyleArr = [];
    elementFieldVal?.map((val)=>{
        if(val==='bold'){
            fontStyleArr.push('bold');
        }
        if(val==='italic'){
            fontStyleArr.push('italic');
        }
        if(val==='underline'){
            fontStyleArr.push('strikethrough');
        }
    })
  return (
    <div className="text-sm font-medium text-gray-700">
         <span>{label} :</span>
      <ToggleGroup type="multiple" variant="outline" defaultValue={fontStyleArr} onValueChange={(e)=>onFontStyleChangeHandle(e)} >
      <ToggleGroupItem value="bold" aria-label="Toggle bold" >
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic" >
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough" >
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
    </div>
  );
};

export default FontStyle;
