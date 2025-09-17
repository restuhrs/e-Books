import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/layout/Header";
import BookList from "../components/books/BookList";
import SearchBook from "../components/books/SearchBook";
import AddBookModal from "../components/books/AddBookModal";
import EditBookModal from "../components/books/EditBookModal";
import DetailBookModal from "../components/books/DetailBookModal";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function Dashboard() {
  const { role } = useAuth();
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [viewBook, setViewBook] = useState(null);

  useEffect(() => {
    fetchBooks();

    const channel = supabase
      .channel("books-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "books" },
        () => fetchBooks()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchBooks = async () => {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("kode_buku", { ascending: true });

    if (!error && data) setBooks(data);
  };

  const addBook = async (book) => {
    const { data, error } = await supabase.from("books").insert(book).select();
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal menyimpan!",
        text: error.message,
      });
      console.error("Insert error:", error);
    } else {
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Buku berhasil ditambahkan.",
        timer: 1500,
        showConfirmButton: false,
      });
      fetchBooks();
    }
  };

  const handleUpdateBook = (updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((b) =>
        b.kode_buku === updatedBook.kode_buku ? updatedBook : b
      )
    );
    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: "Buku berhasil diperbarui.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const deleteBook = async (kode_buku) => {
    const { error } = await supabase
      .from("books")
      .delete()
      .eq("kode_buku", kode_buku);
    if (error) console.error("Gagal hapus buku:", error.message);
    fetchBooks();
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title?.toLowerCase().includes(query.toLowerCase()) ||
      book.author?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="w-full sm:w-auto">
          <SearchBook query={query} setQuery={setQuery} />
        </div>
      </div>

      {role === "admin" && (
        <div className="container mx-auto px-4 mb-4 flex justify-end">
          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white px-5 py-3 rounded-full font-semibold shadow hover:shadow-lg"
          >
            Tambah Buku
          </button>
        </div>
      )}

      <BookList
        books={filteredBooks}
        onDelete={role === "admin" ? deleteBook : undefined}
        onEdit={role === "admin" ? setEditBook : undefined}
        onView={setViewBook}
      />

      {isAddOpen && (
        <AddBookModal onClose={() => setIsAddOpen(false)} onAdd={addBook} />
      )}

      {editBook && (
        <EditBookModal
          book={editBook}
          onClose={() => setEditBook(null)}
          onUpdate={handleUpdateBook}
        />
      )}

      {viewBook && (
        <DetailBookModal book={viewBook} onClose={() => setViewBook(null)} />
      )}
    </div>
  );
}
