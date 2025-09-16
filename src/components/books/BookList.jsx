import { supabase } from "../../config/supabaseClient";
import { Trash2, Info, Edit } from "lucide-react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

function BookList({ books, onEdit, onView, onDelete }) {
  const handleDelete = async (kode_buku) => {
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await supabase.from("books").delete().eq("kode_buku", kode_buku);
          onDelete(kode_buku);
          Swal.fire({
            icon: "success",
            title: "Terhapus!",
            text: "Buku berhasil dihapus.",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (err) {
          console.error(err);
          alert("Gagal menghapus buku");
        }
      }
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {books.length === 0 ? (
        <p className="text-gray-500 text-center italic">Belum ada buku.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book.kode_buku}
              className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-[1.02] hover:shadow-xl flex flex-col"
            >
              {/* Gambar */}
              <img
                src={book.image_url || "/no_cover.png"}
                alt={book.title}
                className="w-full h-56 object-cover bg-gray-100 rounded-t-xl"
              />

              {/* Konten */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-sm text-slate-600 truncate">{book.author}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Kode: {book.kode_buku}
                </p>

                {/* Toolbar Aksi */}
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => onView(book)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-full shadow hover:bg-blue-200 transition"
                    title="Detail Buku"
                  >
                    <Info size={18} />
                  </button>

                  {onEdit && (
                    <button
                      onClick={() => onEdit(book)}
                      className="p-2 bg-yellow-100 text-yellow-600 rounded-full shadow hover:bg-yellow-200 transition"
                      title="Edit Buku"
                    >
                      <Edit size={18} />
                    </button>
                  )}

                  {onDelete && (
                    <button
                      onClick={() => handleDelete(book.kode_buku)}
                      className="p-2 bg-red-100 text-red-600 rounded-full shadow hover:bg-red-200 transition"
                      title="Hapus Buku"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;
