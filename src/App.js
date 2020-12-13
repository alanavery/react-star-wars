import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';

import StarshipPage from './components/StarshipPage';

import './App.css';

function App() {
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        setError(null);
        const res = await axios.get('https://swapi.dev/api/starships/');
        const selectData = await res.data.results.map(({ name, model }, idx) => {
          return { name, model, id: idx + 1 };
        });
        setStarships(selectData);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const starshipLinks = starships.map(({ name, id }) => {
    return (
      <Link to={`/starships/${id}`} key={id}>
        <div className="starship-link">
          <h2>{name}</h2>
        </div>
      </Link>
    );
  });

  return (
    <BrowserRouter>
      <div>
        <Link to="/">
          <h1 className="header">Star Wars Starships</h1>
        </Link>
        <Route
          exact
          path="/"
          render={() => {
            if (loading) {
              return <p className="status-msg">Loading...</p>;
            }
            if (error) {
              return <p className="status-msg">{error.message}</p>;
            }
            return <div className="grid-starship-links">{starshipLinks}</div>;
          }}
        />
        <Route
          path="/starships/:id"
          render={(props) => {
            const id = props.match.params.id;
            return <StarshipPage starship={starships[id - 1]} loading={loading} error={error} />;
          }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
