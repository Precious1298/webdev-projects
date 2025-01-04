import { useState } from 'react';

export default function SearchBar({ dispatch }) {
  const [keyword, setKeyWord] = useState('');
  
  function handleSubmit(e) {
    e.preventDefault();
    if (keyword.trim().length < 3) {
      setKeyWord('');
      return;
    }
    dispatch({ type: 'search', payload: keyword });
    dispatch({ type: 'setLoadingState', payload: true });
    setKeyWord('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-[#bb8686] flex gap-4 p-5 rounded-md my-5'>
      <button className='text-white font-bold bg-black p-1 rounded-md hover:bg-slate-700'>
        SEARCH
      </button>
      <input
        type='text'
        placeholder='Enter text to search!'
        className='p-2 rounded-md outline-none'
        value={keyword}
        onChange={(e) => setKeyWord(e.target.value)}
      />
    </form>
  );
}