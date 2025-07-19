// import React from 'react'
import Header from './components/Header'
import BookList from './components/BookList'
import AddBookForm from './components/AddBookForm'
import SearchBook from './components/SearchBook'
import { useState, useEffect } from 'react'

function App() {

  const[books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem('books')
    return savedBooks ? JSON.parse(savedBooks) : []
  })  

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books))
  }, [books])

  const addBook = (book) => {
    setBooks([...books, book])
  }

  const [query, setQuery] = useState('')

  const filteredBooks = books.filter((book) => 
    book.title.toLowerCase().includes(query.toLowerCase()) ||
    book.author.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      <Header />
      <AddBookForm onAdd={addBook} />
      <SearchBook query={query} setQuery={setQuery} />
      <BookList books={filteredBooks}/>
    </div>

  )
}

export default App
