
import column1 from '@/public/column1.png'
import column2 from '@/public/column2.png'
import column3 from '@/public/column3.png'
import column4 from '@/public/column4.png'
import layout1 from '@/public/layout1.png'
import layout2 from '@/public/layout2.png'
import layout3 from '@/public/layout3.png'
import heading from '@/public/heading.png'



export const LayoutData = [
    {
        id: 1,
        label : 'Single column',
        type : 'column',
        numOfColumns : 1,
        icon : column1
    },
    {
        id: 2,
        label : 'Two columns',
        type : 'column',
        numOfColumns : 2,
        icon : column2
    },
    {
        id: 3,
        label : 'Three column',
        type : 'column',
        numOfColumns : 3,
        icon : column3
    },
    {
        id: 4,
        label : 'Four column',
        type : 'column',
        numOfColumns : 4,
        icon : column4
    },
    {
        id: 5,
        label : 'Heading',
        type : 'heading',
        icon : heading
    },
    {
        id: 6,
        label : 'Text-image1',
        type : 'Text_image1',
        icon : layout1
    },
    {
        id: 7,
        label : 'Text-image2',
        type : 'Text_image2',
        icon : layout2
    },
    {
        id: 8,
        label : 'Header',
        type : 'header',
        icon : layout3
    },
]