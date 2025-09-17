import { useState } from "react";
import { supabase } from "../../config/supabaseClient";
import { Upload, X } from "lucide-react";

function AddBookModal({ onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (file) => setImage(file);
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length > 0) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  };

  // Upload helper
  const uploadToSupabase = async (fileOrImage, folder) => {
    if (!fileOrImage) return null;
    const fileExt = fileOrImage.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(folder)
      .upload(fileName, fileOrImage, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from(folder).getPublicUrl(fileName);
    return data.publicUrl;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;
    setLoading(true);

    try {
      const imageUrl = await uploadToSupabase(image, "images");
      const fileUrl = await uploadToSupabase(file, "files");

      onAdd({
        title,
        author,
        description,
        image_url: imageUrl,
        file_url: fileUrl,
      });

      setTitle("");
      setAuthor("");
      setDescription("");
      setImage(null);
      setFile(null);
      onClose();
    } catch (err) {
      alert("Gagal memproses: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl relative max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-amber-500 to-yellow-400 text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-xl font-semibold">Tambah Buku</h2>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-xl border border-white/40 hover:bg-white/20 transition"
          >
            <X size={26} className="text-white" />
          </button>
        </div>
        <div className="p-6">
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
              <label className="block mb-1 font-medium">Deskripsi</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                rows="4"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">File Buku</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              {file && <p className="text-sm mt-1">{file.name}</p>}
            </div>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
                dragActive ? "border-amber-500 bg-amber-50" : "border-gray-300"
              }`}
              onClick={() => document.getElementById("imageInput").click()}
            >
              <Upload className="mx-auto text-amber-500 mb-2" size={40} />
              <p className="text-gray-400">
                {dragActive
                  ? "Lepaskan gambar di sini..."
                  : "Tarik & lepas gambar atau klik untuk pilih"}
              </p>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e.target.files[0])}
                className="hidden"
              />
            </div>
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg mt-2"
              />
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 text-white py-2 rounded-lg hover:shadow-lg transition-all flex justify-center items-center"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                "Simpan Buku"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBookModal;
