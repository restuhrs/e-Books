import { X } from "lucide-react";

export default function DetailBookModal({ onClose, book }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="mx-auto text-blue-500 mb-2" size={30} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Detail Buku</h2>
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <p className="font-semibold">
          Judul: <span className="text-blue-500 ">{book.title}</span>{" "}
        </p>
        <p className=" font-medium">
          Penulis: <span className="text-teal-500">{book.author}</span>
        </p>
        {book.fileUrl && (
          <p className=" font-medium">
            URL:{" "}
            <a
              href={book.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Download Buku
            </a>
          </p>
        )}
        <p className="text-gray-500 italic mt-4">Kode Buku: {book.id}</p>
      </div>
    </div>
  );
}
