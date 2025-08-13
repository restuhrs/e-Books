import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBook({ query, setQuery }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`relative flex items-center transition-all duration-300 ${
        isFocused ? "w-full sm:w-96" : "w-full sm:w-72"
      }`}
    >
      {/* Icon Search */}
      <Search className="absolute left-3 text-gray-400" size={20} />

      {/* Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Cari buku..."
        className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition-all"
      />
    </div>
  );
}
