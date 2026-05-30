'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export interface ImageItem {
  _id: string;
  name: string;
  description: string;
  fileName: string;
  originalName: string;
}

export default function ImageList() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
  const fetchImages = async () => {
    try {
      const res = await fetch(
        'http://localhost:3002/api/v1/image/get-images'
      );

      if (!res.ok) throw new Error('Failed to fetch images');

      const data = await res.json();
      setImages(data.data.images);
    } catch (error) {
      console.error(error);
      alert('Error getting images');
    } finally {
      setLoading(false);
    }
  };

  fetchImages();
}, []);

  if (loading) {
    return (
      <div className="font-bold text-3xl text-black">Loading...</div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black relative">
      <Link className="absolute top-5 right-5 border-2 p-4 rounded-xl hover:bg-gray-300 cursor-pointer transition-all duration-300" href={'http://localhost:3000/create'}>Add Image</Link>
      <h1 className="text-3xl font-bold mb-6">
        Uploaded Images
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((item: ImageItem) => {

          return (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl"
              onClick={() => router.push(`/image/${item._id}`)}
            >
              <Image
                src={`https://d1qs3ublw9b3x4.cloudfront.net/${item.fileName}`}
                alt={item.name}
                width={100}
                height={100}
                className="w-full h-60 object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-semibold text-black mb-2">
                  {item.name}
                </h2>
                <p>
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}