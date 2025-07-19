import { useState } from "react";

function SearchBook ({ query, setQuery }) {
    return (
        <div className="bg-slate-200 border-b border-slate-200">
            <div className="container mx-auto py-6">
                <div className="relative max-w-md">
                    <input 
                        type="text" 
                        placeholder="Cari Judul Buku..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full px-4 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2
                        focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-slate-400 bg-white"/>
                </div>
            </div>
        </div>
    )
}

export default SearchBook