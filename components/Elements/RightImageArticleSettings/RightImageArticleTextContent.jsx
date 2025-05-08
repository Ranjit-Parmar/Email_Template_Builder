import React, { useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';

const RightImageArticleTextContent = ({
  label,
  fieldName,
  elementFieldVal,
  onRightImageArticleContentChange,
}) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to content height
    }
  }, [elementFieldVal]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}:
        <Textarea
          ref={textareaRef}
          placeholder="Write content here..."
          value={elementFieldVal}
          onChange={(e) => onRightImageArticleContentChange(fieldName,e.target.value)}
          style={{
            overflow: 'hidden',
            resize: 'none', // disables manual resizing
          }}
        />
      </label>
    </div>
  );
};

export default RightImageArticleTextContent;
