export default function ImageForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md space-y-5">
        
        <h2 className="text-xl font-semibold text-gray-800">
          Upload Image
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image Name
          </label>
          <input
            type="text"
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
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}