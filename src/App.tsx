// import { searchMovie } from './services/tmdb';

import Body from './components/Body';

import './App.css';

const App = () => {
  // searchMovie('thor');

  return (
    <div className="app-container">
      <header className="title">Movies</header>
      <div id="space" />
      <Body />
    </div>
  );
};

export default App;
