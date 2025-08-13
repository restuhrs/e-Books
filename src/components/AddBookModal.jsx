import { useState } from "react";
import { Upload } from "lucide-react";
import { X } from "lucide-react";

function AddBookModal({ onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
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
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      setFile(selectedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  const generateKodeBuku = () =>
    `BK-${Math.floor(10000 + Math.random() * 90000)}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    const kodeBuku = generateKodeBuku();
    const fileUrl = file ? URL.createObjectURL(file) : null; // membuat link sementara

    onAdd({ id: kodeBuku, title, author, image, fileUrl });

    // reset form
    setTitle("");
    setAuthor("");
    setImage("");
    setFile(null);
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
        <h2 className="text-xl font-semibold mb-4">Tambah Buku</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Judul Buku</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Penulis</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">File Buku</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full"
            />
            {file && <p className="text-sm mt-1">{file.name}</p>}
          </div>
          <div>
            <label className="block mb-1 font-medium">Gambar Sampul</label>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
                dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              onClick={() => document.getElementById("imageInput").click()}
            >
              <Upload className="mx-auto text-blue-500 mb-2" size={40} />
              <p className="text-gray-400">
                {dragActive
                  ? "Lepaskan gambar di sini..."
                  : "Tarik & lepas gambar atau klik untuk pilih"}
              </p>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files[0])}
                className="hidden"
              />
            </div>
            {image && (
              <img
                src={image}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg mt-2"
              />
            )}
          </div>

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
