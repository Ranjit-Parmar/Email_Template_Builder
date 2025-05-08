
const RightImageArticleOuterStyle = ({label, fieldName, elementFieldVal, onRightImageArticleOuterStyleChange}) => {

  return (
    <div>
      <label className='flex gap-2 text-sm font-medium text-gray-700'>
      {label}:
        <input type="range" min="0" max="100" value={elementFieldVal.replace("%","")} onChange={(e)=>onRightImageArticleOuterStyleChange(fieldName, e.target.value + '%')}/>
      </label>
    </div>
  )
}

export default RightImageArticleOuterStyle