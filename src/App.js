// frontend/src/components/Search.js
import React, { useState,useEffect } from 'react';
import axios from 'axios';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);


 useEffect(() => {
    if (query) {
      axios
        .get(`http://localhost:5000/api/products/search?query=${query}`)
        .then((response) => {
          setResults(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />


      <div>
        {results.map((product) => (
          <div key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
