import { Router, Route } from 'react-router-dom';

import Search from './Pages/Search';
import Details from './Pages/Details';

import './App.css';
import history from './history';

const App = () => {
  return (
    <div className="app-container">
      <header className="app-header title">Movies</header>
      <div id="space" />
      <Router history={history}>
        <Route path="/" exact component={Search} />
        <Route path="/:movieID" component={Details} />
      </Router>
    </div>
  );
};

export default App;
