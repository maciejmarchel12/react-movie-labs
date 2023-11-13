import React from "react";
import PageTemplate from '../components/templateMovieListPage'
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import { getUpcoming } from "../api/tmdb-api";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const Upcoming = (props) => {

  const { data, error, isLoading, isError } = useQuery('upcoming',getUpcoming);

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }

  const movies = data.results

  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favourites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true

  return (
    <PageTemplate
      title='Discover Movies'
      movies={movies}
      action={(movie) => {
        return <PlaylistAddIcon movie={movie} />
      }}
    />
  );
};
export default Upcoming;

// IMPORTANT COMMENT: already refactored to included caching in exercise 1

/* const Upcoming = (props) => {
  
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  const addToFavorites = (movieId) => {
    const updatedMovies = movies.map((m) =>
      m.id === movieId ? { ...m, favorite: true } : m
    );
    setMovies(updatedMovies);
  };

  useEffect(() => {
    getUpcoming().then(movies => {
      setMovies(movies);
    });
  }, []);

  return (
    <PageTemplate
      title='Discover Movies'
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
  );
}; */
