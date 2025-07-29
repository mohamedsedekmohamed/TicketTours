import React, { useState, useEffect } from 'react';
import { MdOutlineCloudDownload } from "react-icons/md";

const FileUploadButton = ({ onFileChange, kind, des, pic }) => {
  const [showed, setShowed] = useState(pic);
  const [error, setError] = useState('');

  useEffect(() => {
    setShowed(pic);
  }, [pic]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type.split('/')[0];
      if (fileType === 'image') {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result;
          setShowed(base64String); // Preview
          onFileChange && onFileChange(base64String, kind); // Send to parent
        };
        reader.readAsDataURL(selectedFile);
        setError('');
      } else {
        setError('Please upload an image file only');
      }
    }
  };

  return (
    <div className="flex flex-col gap-1 mt-3 items-start justify-center px-5 rounded-2xl w-full h-full">
      <span className="font-bold text-one">{kind}</span>
      <span className="text-one">{des}</span>

      <input
        type="file"
        accept="image/*"
        id={`file-upload-${kind}`}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <button
        className="w-full h-full border border-one rounded-[8px] flex justify-center items-center px-5"
        onClick={() => document.getElementById(`file-upload-${kind}`).click()}
      >
        <div className="relative flex justify-center items-center w-full h-full gap-2">
          {showed ? (
            <img
              className="w-full h-full object-cover rounded"
              src={
                showed.startsWith('data:image') || showed.startsWith('http')
                  ? showed
                  : `data:image/jpeg;base64,${showed}`
              }
              alt="Preview"
            />
          ) : (
            <>
              <span className="text-one text-sm">No Image</span>
              <MdOutlineCloudDownload className="w-20 h-20 text-gray-400" />
            </>
          )}
        </div>
      </button>

      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default FileUploadButton;
