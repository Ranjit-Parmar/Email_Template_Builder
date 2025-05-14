import { useUserContext } from '@/app/ConvexClientProvider'
import { api } from '@/convex/_generated/api'
import { useConvex } from 'convex/react'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

const TemplateLists = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [emailTemplatesList, setEmailTemplatesList] = useState([])
  const {userDetails} = useUserContext()
  const convex = useConvex()

  // Inject demo templates only if the list is empty
  useEffect(() => {
    if (emailTemplatesList.length === 0) {
      const demoTemplates = [
        {
          id: 1,
          title: 'Welcome Email',
          description: 'Greet new users with a welcome message.',
          previewImage: '/templates/welcome.png',
        },
        {
          id: 2,
          title: 'Monthly Newsletter',
          description: 'A layout for monthly updates and news.',
          previewImage: '/templates/newsletter.png',
        },
        {
          id: 3,
          title: 'Promo Blast',
          description: 'Perfect for sales and announcements.',
          previewImage: '/templates/promotion.png',
        },
      ]
      getUserTemplates()
      setEmailTemplatesList(demoTemplates)
    }
  }, [])

  const getUserTemplates = async() => {
    setIsLoading(true);
    
      try {
        const result = await convex.query(api.template.getUserEmailTemplates, {
          email: userDetails?.email,
        });
    
        console.log(result)
    
       
      } catch (err) {
        console.error('Error fetching template:', err);
      }
    
      setIsLoading(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Hello, {userDetails?.given_name}</h2>
        <Link  href="/editor/1234" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          + Create New Template
        </Link>
      </div>

      {emailTemplatesList.length === 0 ? (
        <div className="text-gray-600">All the recent templates will be rendered here.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {emailTemplatesList.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={template.previewImage}
                alt={template.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{template.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{template.description}</p>
                <button className="mt-4 w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
                  Edit Template
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TemplateLists
