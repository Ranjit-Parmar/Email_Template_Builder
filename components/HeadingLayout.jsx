import React from 'react';

const HeadingLayout = ({layout}) => {
 
  return (
    <div style={layout.style.outerStyle} className="hover:border"> 
      <div style={layout.style.innerStyle}> Heading </div>
    </div>
  );
}

export default HeadingLayout;
