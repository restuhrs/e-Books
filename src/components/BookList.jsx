function BookList ({books}) {

    return (
        <div className="container mx-auto py-8">
            <div className="grid grid-cols-3 gap-6">
                {books.map((book, index) => (
                        <div key={index} className="bg-white border-slate-200 rounded-xl shadow-sm 
                        hover:shadow-md group transition-all duration-300 px-6 py-6">
                            <div className="flex items-start gap-4">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-slate-800 text-lg leading-tight">{book.title}</h3>   
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                                <p className="text-sm">{book.author}</p>
                            </div>

                        </div>                 
                    )
                )}
            </div>
        </div>
    );
}

export default BookList