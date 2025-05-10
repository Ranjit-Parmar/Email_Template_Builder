import { SelectedElementContext } from '@/context/SelectedElement';
import React, { useContext, useEffect } from 'react';

const HeadingLayout = ({ layout }) => {
  const {
    selectedElement,
    setSelectedElement,
    selectedHeader,
    setSelectedHeader,
    selectedHeading,
    setSelectedHeading,
    selectedLeftImageArticle,
    setSelectedLeftImageArticle,
    selectedRightImageArticle,
    setSelectedRightImageArticle
  } = useContext(SelectedElementContext);

  useEffect(() => {
    if (selectedElement || selectedHeader || selectedLeftImageArticle || selectedRightImageArticle) {
      setSelectedHeading();
    }
  }, [selectedElement, selectedHeader, selectedLeftImageArticle, selectedRightImageArticle]);

  const onClickHandle = ({ layout, id }) => {
    setSelectedHeading();
    setSelectedHeader();
    setSelectedLeftImageArticle();
    setSelectedRightImageArticle();
    setSelectedElement({ layout, id });
  };

  const isSelected = layout?.type === selectedElement?.layout?.type && layout?.id === selectedElement?.layout?.id;

  return (
    
      <div style={layout?.style} className={`
        h-11 cursor-pointer transition-all duration-200 
        rounded-md hover:shadow-md hover:bg-gray-50 
        ${isSelected ? 'border border-blue-500 bg-blue-50' : 'border border-transparent'}
      `}
      onClick={() => onClickHandle({ layout, id: layout?.id })}>
        {layout?.content || 'No content'}
      </div>
  );
};

export default HeadingLayout;
