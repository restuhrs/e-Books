import { useState, useEffect } from "react";
import Header from "./components/Header";
import BookList from "./components/BookList";
import SearchBook from "./components/SearchBook";
import AddBookModal from "./components/AddBookModal";
import EditBookModal from "./components/EditBookModal";
import DetailBookModal from "./components/DetailBookModal";

function App() {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("books");
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [viewBook, setViewBook] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  // Tambah buku
  const addBook = (book) => {
    const kodeBuku = `BK-${Math.floor(10000 + Math.random() * 90000)}`;
    setBooks([...books, { ...book, id: kodeBuku }]);
  };

  // Edit buku
  const saveEditBook = (book) =>
    setBooks(books.map((b) => (b.id === book.id ? book : b)));

  // Hapus buku
  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  // Filter search
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <Header />

      {/* Search & Tambah */}
      <div className="container mx-auto py-6 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center">
        <SearchBook query={query} setQuery={setQuery} />
        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-teal-400 hover:from-teal-400 hover:to-blue-500 text-white px-6 py-3 rounded-full font-semibold shadow hover:shadow-lg transition-all"
        >
          Tambah Buku
        </button>
      </div>

      {/* Daftar buku */}
      <BookList
        books={filteredBooks}
        onDelete={deleteBook}
        onEdit={setEditBook}
        onView={setViewBook}
      />

      {/* Modal Add */}
      {isAddOpen && (
        <AddBookModal
          onClose={() => setIsAddOpen(false)}
          onAdd={(book) => {
            addBook(book);
            setIsAddOpen(false);
          }}
        />
      )}

      {/* Modal Edit */}
      {editBook && (
        <EditBookModal
          book={editBook}
          onClose={() => setEditBook(null)}
          onSave={saveEditBook}
        />
      )}

      {/* Modal Detail */}
      {viewBook && (
        <DetailBookModal book={viewBook} onClose={() => setViewBook(null)} />
      )}
    </div>
  );
}

export default App;
