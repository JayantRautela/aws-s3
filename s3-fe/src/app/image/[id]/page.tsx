import { ImageItem } from '@/app/page';
import Image from 'next/image';

export default async function ImageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(
    `http://localhost:3002/api/v1/image/get-image/${id}`,
    { cache: "no-store", method: "GET" }
  );

  const data = await res.json();
  const imageData = data.data.image as ImageItem;

  return (
    <div className="bg-white text-black w-full min-h-screen p-6">
      <Image
      width={800}
      height={800}
      src={`https://d1qs3ublw9b3x4.cloudfront.net/${imageData.fileName}`}
      alt="image"
      className="p-6 rounded-md bg-gray-600 shadow-md"
      />

      <div>
        <p><span className="font-bold">Name :-</span> {imageData.name}</p>
        <p><span className="font-bold">Description :-</span> {imageData.description}</p>
        <p><span className="font-bold">Original Name :-</span> {imageData.originalName}</p>
      </div>
    </div>
  )
}
