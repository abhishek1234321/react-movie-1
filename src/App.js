import React, { useReducer, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './Header/Header';
import Search from './Search/Search';
import Movie from './Movie/Movie';

const MOVIE_API_URL = 'https://www.omdbapi.com/?s=man&apikey=4a3b711b';
const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

const reducer = (state, action) => {
  switch(action.type) {
    case 'SEARCH_MOVIE_REQUEST':
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case 'SEARCH_MOVIE_SUCCESS':
      return {
        ...state,
        loading: false,
        movies: action.payload
      }
    case 'SEARCH_MOVIES_FAILURE':
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      }
    default:
      return state;

  }
}
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [loading, setLoading] = useState(true);
  // const [movies, setMovies] = useState([]);
  // const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        // setMovies(jsonResponse.Search);
        // setLoading(false);
        dispatch({
          type: 'SEARCH_MOVIE_SUCCESS',
          payload: jsonResponse.Search
        });
      });
  }, []);

  const search = searchValue => {
    // setLoading(true);
    // setErrorMessage(null);
    dispatch({
      type: 'SEARCH_MOVIE_REQUEST'
    });
    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === 'True') {
          // setMovies(jsonResponse.Search);
          // setLoading(false);
          dispatch({
            type: 'SEARCH_MOVIE_SUCCESS',
            payload: jsonResponse.Search
          });
          
        } else {
          // setErrorMessage(jsonResponse.Error);
          // setLoading(false);
          dispatch({
            type: 'SEARCH_MOVIE_FAILURE',
            error: jsonResponse.Error
          });
        }
      });
  };

  const { movies, errorMessage, loading } = state;

  return (
    <div className="App">
      <Header text="The Movie App" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ?
          (
            <span>loading...</span>
          ) : errorMessage ? (
            <div className="error-message">{errorMessage}</div>
          ) : (
            movies.map((movie, index) => {
              return <Movie key={`${index}-${movie.Title}`} movie={movie} />
            })
          )
        }
      </div>
    </div>
  );
}

export default App;
