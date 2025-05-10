import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const TableFontStyle = ({ label, fieldName, elementFieldVal, options, onFontStyleChangeHandle }) => {

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
        {options.map((item, index) => (
          <ToggleGroupItem key={index} className="w-full" value={item.value} aria-label={item.value}>
            {item.icon}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default TableFontStyle;
