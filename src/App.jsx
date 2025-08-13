import Header from "./components/Header";
import BookList from "./components/BookList";
import SearchBook from "./components/SearchBook";
import AddBookModal from "./components/AddBookModal";
import { useState, useEffect } from "react";

function App() {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("books");
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addBook = (book) => {
    const kodeBuku = `BK-${Math.floor(10000 + Math.random() * 90000)}`;
    setBooks([...books, { ...book, id: kodeBuku }]);
  };

  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <Header />

      <div className="container mx-auto py-6 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center">
        {/* Search bar */}
        <SearchBook query={query} setQuery={setQuery} />

        {/* Tombol tambah buku */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-teal-400 hover:from-teal-400 hover:to-blue-500 text-white px-6 py-3 rounded-full font-semibold shadow hover:shadow-lg transition-all"
        >
          Tambah Buku
        </button>
      </div>

      {/* Daftar buku */}
      <BookList books={filteredBooks} onDelete={deleteBook} />

      {/* Modal */}
      {isModalOpen && (
        <AddBookModal
          onClose={() => setIsModalOpen(false)}
          onAdd={(book) => {
            addBook(book);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
