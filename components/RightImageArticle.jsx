import React, { useContext, useEffect } from 'react';
import { SelectedElementContext } from '@/context/SelectedElement';
import { Image as ImageIcon } from 'lucide-react'; // fallback icon from Lucide

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
      style={{ display: 'flex' }}
      className={`${
        layout?.type === selectedElement?.layout?.type && layout?.id === selectedElement?.layout?.id
          ? 'border border-blue-500'
          : ''
      }`}
      onClick={() => onClickHandle({ layout, id: layout?.id })}
    >
      <div style={layout?.style}>
        {layout?.content}
      </div>

      <div style={layout?.outerStyle}>
        {layout?.imageUrl ? (
          <img
            src={layout.imageUrl}
            alt={layout.alt || 'image_placeholder'}
            style={{
              width: 'auto',
              minwidth: '50%',
              height: 'auto',
              display: 'block',
            }}
          />
        ) : (
          <ImageIcon
            size={48}
            color="gray"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: '4px',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default RightImageArticle;
