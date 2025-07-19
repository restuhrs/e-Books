import { useState } from "react";

function AddBookForm( { onAdd } ) {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (title.trim() === '' || author.trim() === '') return
        onAdd({title, author})
        setTitle('')
        setAuthor('')

    }

    return (
        <div className="bg-white shadow-sm border-b border-slate-200">
            <div className="container mx-auto py-6">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <input 
                                type="text" 
                                placeholder="Judul Buku" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg 
                                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all 
                                duration-200 placeholder-slate-400"/>
                        </div>
                        <div className="flex-1">
                            <input     
                                type="text" 
                                placeholder="Penulis" 
                                value={author} 
                                onChange={(e) => setAuthor(e.target.value)}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg 
                                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all 
                                duration-200 placeholder-slate-400"/>                           
                        </div>
                        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
                            text-white px-6 py-3 rounded font-semibold flex items-center gap-2 transition-all duration-200 shadow-md
                            hover:shadow-lg hover:scale-105" 
                            type="submit">Tambah Buku
                        </button> 
                    </div>
                </form>
            
            </div>
        </div>
    )
}

export default AddBookForm 