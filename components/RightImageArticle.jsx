import React, { useContext, useEffect } from 'react';
import { SelectedElementContext } from '@/context/SelectedElement';
import { ImageIcon } from 'lucide-react';

const RightImageArticle = ({ layout }) => {
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
    setSelectedRightImageArticle,
  } = useContext(SelectedElementContext);

  useEffect(() => {
    if (selectedElement || selectedHeader || selectedHeading || selectedLeftImageArticle) {
      setSelectedRightImageArticle();
    }
  }, [selectedElement, selectedHeader, selectedHeading, selectedLeftImageArticle]);

  const onClickHandle = ({ layout, id }) => {
    setSelectedRightImageArticle();
    setSelectedLeftImageArticle();
    setSelectedHeader();
    setSelectedHeading();
    setSelectedElement({ layout, id });
  };

  return (
    <div
      className={`flex ${
        layout?.type === selectedElement?.layout?.type && layout?.id === selectedElement?.layout?.id
          ? 'border border-blue-500'
          : ''
      }`}
      onClick={() => onClickHandle({ layout, id: layout?.id })}
    >
      <div style={layout?.style} className="w-full flex">
        {layout?.content}
      </div>
      <div style={layout?.outerStyle} className="min-w-44">
        <img
          src={layout?.imageUrl || ImageIcon}
          alt="image_placeholder"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            borderRadius: '4px',
          }}
        />
      </div>
    </div>
  );
};

export default RightImageArticle;
