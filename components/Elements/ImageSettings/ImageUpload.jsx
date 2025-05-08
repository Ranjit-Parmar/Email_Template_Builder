'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

const ImageUpload = ({ label, fieldName, elementFieldVal, onImageUploadHandle }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUploadHandle(fieldName,reader.result);
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 border border-dashed border-gray-300 rounded-lg shadow-sm bg-white">
      {label && (
        <p className="mb-3 text-sm font-medium text-gray-700 text-left w-full">{label}</p>
      )}

      <label
        htmlFor="image-upload"
        className="flex items-center justify-center w-full h-40 cursor-pointer rounded-md border border-gray-300 bg-gray-50 hover:bg-gray-100 transition"
      >
        <div className="text-center">
          <ImageIcon className="mx-auto h-6 w-6 text-gray-400" />
          <p className="mt-1 text-sm text-gray-600">Click to upload an image</p>
        </div>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>

      {elementFieldVal && (
        <div className="mt-4 rounded-md overflow-hidden">
          <Image
            src={image || elementFieldVal}
            alt="Uploaded Preview"
            width={1200}
            height={600}
            priority
            className="w-full h-auto rounded-md border"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
