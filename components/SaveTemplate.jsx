'use client';
import { useUserContext } from '@/app/ConvexClientProvider';
import { LayoutContext } from '@/context/LayoutContext';
import { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { api } from '@/convex/_generated/api'; // Path to Convex API autogen
import { useMutation } from 'convex/react';
import { useParams } from 'next/navigation';
import axios from 'axios';

const SaveTemplateButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userDetails } = useUserContext();
  const { layoutDataArray } = useContext(LayoutContext);
  const saveTemplate = useMutation(api.template.SaveTemplate); // Use Convex mutation
  const {templateId} = useParams();

  const uploadImagesToCloudinary = async (layoutArray) => {
  const updatedArray = await Promise.all(
    layoutArray.map(async (element) => {
      const isBase64 = typeof element.imageUrl === 'string' && element.imageUrl.startsWith('data:image');

      if (isBase64) {
        try {
          const { data } = await axios.post('/api/uploadImagetoCloudinary', {
            file: element.imageUrl,
          });

          return {
            ...element,
            imageUrl: data.url, // Replace base64 with Cloudinary URL
          };
        } catch (error) {
          console.error('Cloudinary upload failed:', error);
          return element; // return original element if upload fails
        }
      }

      return element; // Already a URL or no image, return as-is
    })
  );

  return updatedArray;
};

  const handleSave = async () => {
    setIsLoading(true);

    try {
      const updatedLayoutData = await uploadImagesToCloudinary(layoutDataArray);

    const result = await saveTemplate({
      templateId,
      template: updatedLayoutData,
      email: userDetails?.email,
    });

      console.log('Template saved with id:', result);
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition`}
      disabled={isLoading}
      onClick={handleSave}
    >
      {isLoading ? 'Saving...' : 'Save Template'}
    </button>
  );
};

export default SaveTemplateButton;
