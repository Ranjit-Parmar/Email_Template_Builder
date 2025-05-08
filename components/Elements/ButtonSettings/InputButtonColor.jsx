const InputButtonColor = ({ label, fieldName, elementFieldVal, onInputButtonStyleChangeHandle }) => {
  return (
    <div>
      <label className="flex items-center text-sm font-medium text-gray-700">
        <span>{label}</span>:
        <input
          className="ml-3 form-input"
          type="color"
          value={elementFieldVal}
          onChange={(e) => onInputButtonStyleChangeHandle(fieldName, e.target.value)}
        />
      </label>
    </div>
  );
};

export default InputButtonColor;
