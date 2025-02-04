'use client'
import React, { useContext } from 'react'

// layout data imports
import column1 from '@/public/column1.png'
import column2 from '@/public/column2.png'
import column3 from '@/public/column3.png'
import column4 from '@/public/column4.png'
import layout1 from '@/public/layout1.png'
import layout2 from '@/public/layout2.png'
import layout3 from '@/public/layout3.png'
import heading from '@/public/heading.png'
import LayoutCard from './LayoutCard'

// element data imports
import button from '@/public/button.png'
import spacer from '@/public/spacer.png'
import table from '@/public/Table.png'
import image from '@/public/image.png'
import text from '@/public/Text.png'
import divider from '@/public/Divider.png'
import ElementCard from './ElementCard'
import { LayoutContext } from '@/context/LayoutContext'
import { ElementContext } from '@/context/ElementContext'


const LayoutData = [
  {
      
      label : 'Single column',
      type : 'column',
      numOfColumns : 1,
      icon : column1,
      style : {
        width : '100%',
        
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#f3f4f6',
      }
  },
  {
      
      label : 'Two columns',
      type : 'column',
      numOfColumns : 2,
      icon : column2,
      style : {
        width : '100%',
        
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#f3f4f6',
      }
  },
  {
      
      label : 'Three column',
      type : 'column',
      numOfColumns : 3,
      icon : column3,
      style : {
        width : '100%',
        
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#f3f4f6',
      }
  },
  {
      
      label : 'Four column',
      type : 'column',
      numOfColumns : 4,
      icon : column4,
      style : {
        width : '100%',
        
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#f3f4f6',
      }
  },
  {
      
      label : 'Heading',
      type : 'heading',
      icon : heading,
      style : {
        outerStyle: {
          
          width : '100%',
          fontSize : '18px',
          lineHeight : '28px',
          fontWeight : 'bold',
        },
        innerStyle: {
          overflowWrap : 'break-word',
          textAlign : 'center'
        }
      }
  },
  {
      
      label : 'Article 1',
      type : 'right-image-article',
      icon : layout1
  },
  {
      
      label : 'Article 2',
      type : 'left-image-article',
      icon : layout2
  },
  {
      
      label : 'Header',
      type : 'header',
      icon : layout3
  },
]


const ElementData = [
  // p-3 bg-blue-600 w-40 shadow-md hover:bg-blue-700 text-white rounded-md
  {
      
      label : 'Button',
      type : 'button',
      icon : button,
      style : {
        padding : '12px',
        backgroundColor : '#2563eb',
        width : '160px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        color: 'white',
        borderRadius: '0.375rem'        
      }
  },
  {
      
      label : 'Table',
      type : 'table',
      icon : table
  },
  {
    // w-52 h-52 rounded-md
      label : 'Image',
      type : 'image',
      icon : image,
      style : {
        innerStyle : {
         width : '13rem',
         height : '13rem',
         objectFit : 'cover',
        },
        outerStyle : {
          display : "flex",
          justifyContent : "center",
          alignItems : "center",
          width : "100%",
          height : "auto",
          backgroundColor : '#FFFFFF'
        }
      }
  },
  {
      
      label : 'Typography',
      type : 'typography',
      icon : text
  },
  {
      
      label : 'Divider',
      type : 'divider',
      icon : divider,
      style : {
        height: '2px',
        width: '100%',
        backgroundColor:'black',
        borderRadius: '10px'
      }
  },
  {
      
      label : 'Spacer',
      type : 'spacer',
      icon : spacer
  },

]

const Sidebar = () => {
  const {setLayoutDataObj} = useContext(LayoutContext);
  const {setElementDataObj} = useContext(ElementContext);

  const onDragStartLayoutHandle = (layout) => {
    setLayoutDataObj({
      dragValue: {
        ...layout,
        id : Date.now()
      }
      
    });
    setElementDataObj(null)
  }
  const onDragStartElementHandle = (element) => {
    setElementDataObj({
      dragValue: { 
        ...element,
        id : Date.now()
       }
    })
    setLayoutDataObj(null)    
  }

  return (
    <div className='border h-screen overflow-y-auto p-2 custom-scrollbar'>
      <h2 className='mt-2 px-2 font-semibold text-gray-500'>Layout</h2>
      <div className='grid grid-cols-2 gap-2'>
        {LayoutData?.map((layout, i) => {
          return (
            <div key={i} draggable onDragStart={()=>onDragStartLayoutHandle(layout)}>
            <LayoutCard layout={layout}/>
            </div>
          );
        })}
      </div>
      <hr className='mt-2'/>
      <h2 className='mt-2 px-2 font-semibold text-gray-500'>Element</h2>
      <div className='grid grid-cols-2 gap-2'>
        {ElementData?.map((element, i) => {
          return (
            <div key={i} draggable onDragStart={()=>onDragStartElementHandle(element)}>
            <ElementCard element={element} />
            </div>
          );
        })}
      </div>
    </div>
  );
}


export default Sidebar