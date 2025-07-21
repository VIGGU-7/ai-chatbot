import React, { useState } from 'react';
import { X } from 'lucide-react';
import { apiInstance } from '../lib';

const SearchDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await apiInstance.post("/search",{q:query})
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold mb-4">Search Sessions</h2>
        <input
          type="text"
          placeholder="Enter search term..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearch}
          className="mt-4 bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>

        {results.length > 0 && (
          <ul className="mt-4 max-h-40 overflow-y-auto border-t pt-2">
            {results.map((item) => (
              <li onClick={()=>{window.location.href=`/chat/${item._id}`}} key={item._id} className="py-1 px-2 hover:bg-gray-100 rounded-md hover:cursor-pointer">
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchDialog;
