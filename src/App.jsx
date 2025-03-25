import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';

function getFiltered(text) {
  return text.toLowerCase().replace(' ', '');
}

function getPreparedItems(movies, { query }) {
  let preparedGood = [...movies];

  if (query) {
    const parameters = getFiltered(query);

    preparedGood = preparedGood.filter(
      item =>
        getFiltered(item.title).includes(parameters) ||
        getFiltered(item.description).includes(parameters),
    );
  }

  return preparedGood;
}

export const App = () => {
  const [query, setQuery] = useState('');
  const visibleItems = getPreparedItems(moviesFromServer, { query });

  return (
    <div className="page">
      <div className="page-content">
        <div className="box">
          <div className="field">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="search-query" className="label">
              Search movie
            </label>

            <div className="control">
              <input
                type="text"
                id="search-query"
                className="input"
                placeholder="Type search word"
                onChange={event => setQuery(event.target.value)}
              />
            </div>
          </div>
        </div>

        <MoviesList movies={visibleItems} />
      </div>

      <div className="sidebar">Sidebar goes here</div>
    </div>
  );
};
