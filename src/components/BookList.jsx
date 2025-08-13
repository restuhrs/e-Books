import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

function BookList({ books, onDelete }) {
  const handleDelete = (id) => {
    Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Buku ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      customClass: {
        confirmButton:
          "bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-2 px-4 rounded-xl hover:from-red-600 hover:to-pink-600 focus:outline-none",
        cancelButton:
          "bg-blue-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-blue-600 focus:outline-none ml-4",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id);
        Swal.fire({
          icon: "success",
          title: "Terhapus!",
          text: "Buku berhasil dihapus.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="container mx-auto py-8">
      {books.length === 0 ? (
        <p className="text-gray-500 text-center italic">
          Belum ada buku, tambahkan dulu.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              {/* Gambar */}
              <img
                src={
                  book.image ||
                  "https://m.media-amazon.com/images/I/81iqZ2HHD-L.jpg"
                }
                alt={book.title}
                className="w-full h-64 object-cover bg-gray-100"
              />

              {/* Konten */}
              <div className="p-5 flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-sm text-slate-600">{book.author}</p>
                  <p className="text-xs text-gray-400 mt-1">Kode: {book.id}</p>
                </div>

                {/* Tombol Hapus */}
                <button
                  onClick={() => handleDelete(book.id)}
                  className="absolute bottom-4 right-4 p-2 bg-red-100 text-red-600 rounded-full transition-all shadow-md"
                  title="Hapus Buku"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;
