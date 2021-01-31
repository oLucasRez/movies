import { Router, Route } from 'react-router-dom';

import Search from './Pages/Search';
import Details from './Pages/Details';

import './App.css';
import MovieContext from './contexts/MovieContext';
import { useState } from 'react';
import IMovie from './interfaces/IMovie';
import history from './history';

const App = () => {
  return (
    <div className="app-container">
      <header className="app-header title">Movies</header>
      <div id="space" />
      <MovieContext.Provider value={useState<IMovie>()}>
        <Router history={history}>
          <Route path="/" exact component={Search} />
          <Route path="/details" component={Details} />
        </Router>
      </MovieContext.Provider>
    </div>
  );
};

export default App;
