'use client';
import { useUserContext } from '@/app/ConvexClientProvider';
import { LayoutContext } from '@/context/LayoutContext';
import { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { api } from '@/convex/_generated/api'; // Path to Convex API autogen
import { useMutation } from 'convex/react';
import { useParams } from 'next/navigation';

const SaveTemplateButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userDetails } = useUserContext();
  const { layoutDataArray } = useContext(LayoutContext);
  const saveTemplate = useMutation(api.template.SaveTemplate); // Use Convex mutation
   const {templateId} = useParams();

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const result = await saveTemplate({
        templateId,
        template: layoutDataArray,
        email: userDetails?.email
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
