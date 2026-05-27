'use client';
import React, { useState } from "react";

export default function ImageForm() {
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [presignedUrl, setPresignedUrl] = useState("");

  const uploadToS3 = async (presignedUrl: string, file: File) => {
    const res = await fetch(presignedUrl, {
      method: "PUT",
      headers: {
        'content-type': file.type || "application/octet-stream"
      },
      body: file
    });

    if (!res.ok) {
      console.log("Error uploading file to S3");
      return;
    }

    console.log("success");
  } 

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);

      const mime = file.type;

      const response = await fetch('http://localhost:3002/api/v1/upload/get-presigned-url', {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ mime })
      });

      if (!response.ok) {
        console.log("Error getting presigned url");
        return;
      }

      const res = await response.json();

      const url = res.data.url;
      const generatedFileName = res.data.fileName;

      setPresignedUrl(url);
      setFileName(generatedFileName);

      await uploadToS3(url, file);
    }

  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3002/api/v1/upload/image", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name, 
        description,
        fileName,
        originalName: image?.name
      })
    });

    if (!res.ok) {
      console.log("Error in adding to db");
      return;
    }

    console.log("All done!!")
    window.alert("Success");
    setImage(null);
    setDescription("");
    setName("");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md space-y-5 text-black" onSubmit={handleSubmit}>
        
        <h2 className="text-xl font-semibold text-gray-800">
          Upload Image
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="imageName"
            placeholder="Enter image name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}