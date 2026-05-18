import React from 'react'

type Props = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({searchText, setSearchText}: Props) => {
  return (
    <div>
      <div className='search_container w-full flex items-center justify-center'>
        <div className='search_input w-full md:w-1/2 lg:w-1/3 flex items-center bg-gray-100 rounded-full px-4 py-2'>
          <input type="text" placeholder='Cauta quiz-uri dupa titlu...' className=' w-full bg-transparent focus:outline-none' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default SearchBar