import { Search } from "lucide-react";

export default function SearchBook({ query, setQuery }) {
  return (
    <div
      className={`relative flex items-center transition-all duration-300 
    w-full sm:w-72 lg:w-96`}
    >
      <Search className="absolute left-3 text-gray-400" size={20} />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari buku..."
        className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 
      focus:border-amber-500 focus:ring-2 focus:ring-amber-300 outline-none transition-all"
      />
    </div>
  );
}
