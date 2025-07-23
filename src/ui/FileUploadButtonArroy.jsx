import React, { useRef } from "react";

const FileUploadButtonArroy = ({ name, kind,des, flag = [], onFileChange }) => {
  const fileInputRef = useRef(null);

  // عند اختيار صور جديدة
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const readers = [];

    files.forEach((file) => {
      const reader = new FileReader();
      readers.push(
        new Promise((resolve) => {
          reader.onload = (event) => {
            resolve({ imagePath: event.target.result }); // صورة جديدة بدون id
          };
          reader.readAsDataURL(file);
        })
      );
    });

    Promise.all(readers).then((newImages) => {
      const updated = [...flag, ...newImages];
      onFileChange(updated);
    });
  };

  const handleRemoveImage = (indexToRemove) => {
    const updated = flag.filter((_, index) => index !== indexToRemove);
    onFileChange(updated); // نحدث القائمة بعد الحذف
  };

  return (
    <div className="flex flex-col gap-1 mt-2 px-5">
      <label className="text-lg font-bold text-one">{kind}</label>
      <span className='  text-one'>{des}</span>

      <div className="flex flex-wrap gap-3">
        {Array.isArray(flag) &&flag.map((img, index) => (
          <div key={index} className="relative w-24 h-24 border rounded overflow-hidden">
            <img
              src={img.imagePath}
              alt={`uploaded-${index}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded"
            >
              X
            </button>
          </div>
        ))}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="px-4 py-2 bg-one text-white rounded-lg"
      >
        Upload {kind}
      </button>
    </div>
  );
};

export default FileUploadButtonArroy;
