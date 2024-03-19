import { useState,useEffect } from 'react';
import './App.css';
import React from 'react';
import searchIcon from './search.svg';
import MovieList from './MovieList';

const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const App = ()=>{

  const [movies,searchMovies] = useState([]);
  const [searchmovies, setsearchmovies] = useState('');
  const search = async(title)=>{
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    searchMovies(data.Search);
  }

  useEffect(()=>{
    search('Star Wars');
  },[]);

  
  
  return (
    <>
    <div className='app'>
      <h1>Movie Paradise</h1>
      <div className='search'>
        <input placeholder='search' value={searchmovies} onChange={(e)=>setsearchmovies(e.target.value)} />
        <img src={searchIcon} alt='search icon' onClick={()=>search(searchmovies)}/>
      </div>
      {movies? (
        <div className="container">
          {movies.map((movie) => (
            <MovieList movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
        
      </div>
    
      
    </>
  );
}

export default App;
