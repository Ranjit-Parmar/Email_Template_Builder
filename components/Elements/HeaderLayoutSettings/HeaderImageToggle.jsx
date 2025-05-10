import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const HeaderImageToggle = ({ label, fieldName, elementFieldVal, onToggleHandle }) => {
  const handleChange = (checked) => {
    onToggleHandle(fieldName, checked);
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch 
        id={fieldName}
        checked={elementFieldVal==='flex'?true:false} 
        onCheckedChange={handleChange}
      />
      <Label htmlFor={fieldName}>{label}</Label>
    </div>
  )
}

export default HeaderImageToggle
