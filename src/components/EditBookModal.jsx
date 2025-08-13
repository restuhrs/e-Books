import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { X } from "lucide-react";

export default function EditBookModal({ onClose, book, onSave }) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [image, setImage] = useState(book.image || "");
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    setTitle(book.title);
    setAuthor(book.author);
    setImage(book.image || "");
    setFile(null);
  }, [book]);

  const handleImageUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) handleImageUpload(e.target.files[0]);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0])
      handleImageUpload(e.dataTransfer.files[0]);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };
  const handleDragLeave = () => setDragActive(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    const fileUrl = file ? URL.createObjectURL(file) : book.fileUrl;
    onSave({ ...book, title, author, image, fileUrl });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="mx-auto text-blue-500 mb-2" size={30} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Edit Buku</h2>
        <form onSubmit={handleSubmit}>
          {/* Judul Buku */}
          <div className="flex flex-col mb-4">
            <label className="text-gray-400 mb-1.5">Judul Buku</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Penulis */}
          <div className="flex flex-col mb-4">
            <label className="text-gray-400 mb-1.5">Penulis</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          {/* File */}
          <div>
            <label className="block mb-1 font-medium">File Buku</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                setFile(selectedFile);
              }}
            />
            {file ? (
              <p className="text-sm mt-1">{file.name}</p>
            ) : book.fileUrl ? (
              <a
                href={book.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline text-sm mt-1 block"
              >
                File saat ini
              </a>
            ) : null}
          </div>

          {/* Gambar */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onClick={() => document.getElementById("editFileInput").click()}
          >
            <Upload className="mx-auto text-blue-400 mb-2" size={40} />
            <p className="text-gray-400">
              {dragActive
                ? "Lepaskan gambar di sini..."
                : "Tarik & lepas gambar atau klik untuk pilih"}
            </p>
            <input
              id="editFileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          {image && (
            <img
              src={image}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg mt-3"
            />
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white py-2 rounded-lg hover:shadow-lg transition-all"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
}
