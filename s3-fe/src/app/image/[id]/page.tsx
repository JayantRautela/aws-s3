'use client';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React from 'react'

export default function ImageDetailPage() {
  const searchParams = useSearchParams();
  const imageLink = searchParams.get('link') as string;

  return (
    <div className="bg-white text-black w-full min-h-screen p-6">
      <Image
      width={800}
      height={800}
      src={imageLink}
      alt="image"
      className="p-6 rounded-md bg-gray-600 shadow-md"
      />
    </div>
  )
}
