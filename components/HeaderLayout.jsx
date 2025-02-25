import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import logo from '@/public/logo.png'
import { SelectedElementContext } from '@/context/SelectedElement';
import { LayoutContext } from '@/context/LayoutContext';

const HeaderLayout = ({layout}) => {
  const { selectedElement, setSelectedElement, selectedHeader, setSelectedHeader, selectedHeading, setSelectedHeading,  selectedLeftImageArticle, setSelectedLeftImageArticle,
    selectedRightImageArticle, setSelectedRightImageArticle } = useContext(SelectedElementContext);
  const [menuLinks, setMenuLinks] = useState(['home','about','contact','help']);
  
  const [headerStyles, setHeaderStyles] = useState({
    outerStyle: {
      backgroundColor: '#60a5fa',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
      borderRadius: '0px',
    },
    imageDiv: {
      display: 'flex',
    },
    imageStyle: {
      borderRadius: '0px',
    },
    innerStyle: {
      padding: '10px 20px',
      color: '#fff',
      fontSize: '16px',
      fontWeight: 'bold',
      letterSpacing: '0.2px',
      textTransform: 'uppercase',
      borderRadius: '0.5rem',
      cursor: 'pointer',
    }
  });

  useEffect(()=>{
    if(selectedElement || selectedHeading || selectedLeftImageArticle || selectedRightImageArticle){
      setSelectedHeader();
    }
  },[selectedElement, selectedHeading, selectedLeftImageArticle, selectedRightImageArticle])

  const onClickHandle = ({layout,id}) => {
    setSelectedHeader({layout,id})
    setSelectedElement();
    setSelectedHeading();
    setSelectedLeftImageArticle();
    setSelectedRightImageArticle();
  }

  
  return (
    <div style={headerStyles?.outerStyle} className={`bg-blue-400 flex justify-between items-center w-full ${(layout?.type==selectedHeader?.layout?.type && layout?.id==selectedHeader?.layout?.id) && 'border border-blue-500'}`} onClick={()=>onClickHandle({layout,id:layout?.id})}>
        <div style={headerStyles?.imageDiv} className='ml-3 h-full flex justify-center items-center'>
            <Image style={headerStyles?.imageStyle} src={logo} height={50} width={50} alt='logo' className='rounded-full'/>
        </div>
        <div style={headerStyles?.innerStyle} className='mr-3 h-full w-full'>
            <ul className='w-full h-full flex justify-end gap-2 items-center font-medium'>
              {menuLinks?.map((val,i)=>(
                <li key={i} className='py-2 px-4'>{val}</li>
              ))}
                
            </ul>
        </div>
    </div>
  )
}

export default HeaderLayout