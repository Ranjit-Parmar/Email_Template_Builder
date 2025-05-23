import { Bold, Italic, Underline } from "lucide-react"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

const FontStyle = ({ label, elementFieldVal, onFontStyleChangeHandle }) => {

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


  return (
    <div className="text-sm space-y-1 font-medium text-gray-700">
      <span>{label} :</span>
      <ToggleGroup 
        type="multiple" 
        variant="outline"
        value={updatedFontStyleArr} 
        onValueChange={(e) => onFontStyleChangeHandle(e)} 
      >
        <ToggleGroupItem value="bold" className="w-full" aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" className="w-full" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="strikethrough" className="w-full" aria-label="Toggle strikethrough">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default FontStyle;
