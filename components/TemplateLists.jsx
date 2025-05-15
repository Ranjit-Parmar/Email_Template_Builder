import { useUserContext } from '@/app/ConvexClientProvider';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import TemplateSkeleton from './TemplateSkeleton';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

const TemplateLists = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailTemplatesList, setEmailTemplatesList] = useState([]);
  const { userDetails } = useUserContext();
  const convex = useConvex();
  const router = useRouter();

  useEffect(() => {
    if (userDetails) {
      getUserTemplates();
    }
  }, [userDetails]);

  const getUserTemplates = async () => {
    setIsLoading(true);
    try {
      const result = await convex.query(api.template.getUserEmailTemplates, {
        email: userDetails?.email,
      });
      setEmailTemplatesList(result || []);
    } catch (err) {
      console.error('Error fetching template:', err);
      setEmailTemplatesList([]);
    }
    setIsLoading(false);
  };

  const handleCreateTemplate = () => {
    const newId = uuidv4();
    router.push(`/editor/${newId}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Hello, {userDetails?.given_name}
        </h2>
        <button
          onClick={handleCreateTemplate}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          + Create New Template
        </button>
      </div>

      {isLoading ? (
        <TemplateSkeleton />
      ) : emailTemplatesList.length === 0 ? (
        <div className="text-gray-600">
          All the recent templates will be rendered here.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {emailTemplatesList.map((val) => (
            <div
              key={val._id || val.templateId}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={val?.previewImage}
                alt={val?.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{val?.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{val?.description}</p>
                <Link href={`/editor/${val.templateId}`}>
                  <button className="mt-4 w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
                    Edit Template
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateLists;
