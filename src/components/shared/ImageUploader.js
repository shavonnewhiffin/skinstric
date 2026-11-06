'use client'

import { useRef } from 'react'

const ImageUploader = ({ onUpload, children }) => {
    const fileInputRef = useRef(null);

    const handleImageUpload = (event) => {
        // Receive the click event of the input and grab the first file
        const file = event.target.files[0];
        // Create new file reader
        const reader = new FileReader();

        // When the reader is done reading:
        reader.onloadend = () => {
            // Call onUpload with Base64 image (if the parent passed one)
            onUpload?.(reader.result);
        }

        // Read the file (this starts the reader, then onloadend runs when it's done)
        reader.readAsDataURL(file)
    }

  return (
    <>
        <input type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        style={{ display:'none' }}
        />
        {/* Whatever is placed between <ImageUploader> tags becomes the clickable area */}
        <button
          onClick={() => fileInputRef.current.click()}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          {children}
        </button>
    </>
  )
}

export default ImageUploader
