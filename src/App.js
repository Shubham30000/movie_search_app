import React from "react";
import { useState, useEffect } from "react";
import './App.css';
import searchicon from './search.svg';
import Moviecard from "./Moviecard";

const API_URL = `https://www.omdbapi.com?apikey=${process.env.REACT_APP_OMDB_API_KEY}`;



const App = () => {
    const [movies,setMovies] = useState([]);
    const [searchterm,setSearchterm] = useState('');
    const searchmovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }


    useEffect (() => {
        searchmovies('Spiderman');

    },[]);
    return (

        <div className="app">
            <h1>Movie Land</h1>
            <div className="search">
                <input 
                placeholder="searchformovies" 
                value={searchterm}
                onChange={(e) => setSearchterm(e.target.value)}
                />

                <img 
                src={searchicon}
                alt="search"
                onClick={() => searchmovies(searchterm)}
                />

            </div>

            {
                movies?.length > 0
                ? (
                    <div className="container">
                       {movies.map((movie) => (
                        <Moviecard movie = {movie}/>
                       ))}
                    </div>


                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }

            
        </div>
        
        
    );
}

export default App;