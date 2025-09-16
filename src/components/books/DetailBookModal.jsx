import { X } from "lucide-react";

export default function DetailBookModal({ onClose, book }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-xl border border-gray-300 hover:border-gray-400 hover:bg-gray-100 transition-colors duration-200"
        >
          <X className="text-gray-600" size={26} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Detail Buku</h2>
        <img
          src={book.image_url || "/no_cover.png"}
          alt={book.title}
          className="w-full h-48 sm:h-64 object-cover rounded-lg mb-4 bg-gray-100"
        />
        <div className="space-y-2 text-sm sm:text-base">
          <p className="text-black font-medium">
            Judul: <span className="text-amber-800">{book.title}</span>
          </p>
          <p className="text-black font-medium">
            Penulis: <span className="text-amber-600">{book.author}</span>
          </p>

          {book.file_url && (
            <p className="text-black font-medium">
              Download:{" "}
              <a
                href={book.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800 transition-colors"
              >
                Klik disini
              </a>
            </p>
          )}

          <p className="text-black font-medium">
            Deskripsi:{" "}
            <span className="text-gray-500 break-words">
              {book.description}
            </span>
          </p>
          <p className="text-black italic mt-4">Kode Buku: {book.kode_buku}</p>
        </div>
      </div>
    </div>
  );
}
