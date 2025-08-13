import { useState } from "react";
import { Upload } from "lucide-react";

function AddBookModal({ onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleImageUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  // Generator kode buku 5 digit
  const generateKodeBuku = () => {
    return `BK-${Math.floor(10000 + Math.random() * 90000)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    const kodeBuku = generateKodeBuku();
    onAdd({ id: kodeBuku, title, author, image });

    setTitle("");
    setAuthor("");
    setImage("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">Tambah Buku</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Judul Buku"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Penulis"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {/* Dropzone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-300 cursor-pointer ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onClick={() => document.getElementById("fileInput").click()}
          >
            <Upload className="mx-auto text-blue-400 mb-2" size={40} />
            <p className="text-gray-400">
              {dragActive
                ? "Lepaskan gambar di sini..."
                : "Tarik & lepas gambar atau klik untuk pilih"}
            </p>
            <input
              id="fileInput"
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
            Simpan Buku
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBookModal;
