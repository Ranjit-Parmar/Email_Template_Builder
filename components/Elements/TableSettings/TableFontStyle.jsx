import { LucideCaseUpper, LucideCaseLower, ALargeSmall } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const TableFontStyle = ({ label, fieldName, elementFieldVal, onFontStyleChangeHandle }) => {
  const fontStyleData = [
    {
      fontValue: "Uppercase",
      icon: <LucideCaseUpper/>,
    },
    {
      fontValue: "Lowercase",
      icon: <LucideCaseLower/>,
    },
    {
      fontValue: "Capitalize",
      icon: <ALargeSmall/>,
    },
  ];

  const handleValueChange = (newValue) => {
    if (newValue !== elementFieldVal && newValue !== '') {
      onFontStyleChangeHandle(fieldName, newValue);
    }
  };

  return (
    <div className="text-sm space-y-1 font-medium text-gray-700">
      <span>{label} :</span>
      <ToggleGroup
        type="single"
        variant="outline"
        value={elementFieldVal}
        onValueChange={handleValueChange}
      >
        {fontStyleData.map((item, index) => (
          <ToggleGroupItem key={index} className="w-full" value={item.fontValue} aria-label={item.fontValue}>
            {item.icon}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default TableFontStyle;
