import { Link } from 'react-router-dom';

function StarshipPage(props) {
  if (props.loading) {
    return <p className="status-msg">Loading...</p>;
  }
  if (props.error) {
    return <p className="status-msg">{props.error.message}</p>;
  }
  return (
    <div className="starship">
      <p>Name: {props.starship.name}</p>
      <p>Model: {props.starship.model}</p>
      <Link to="/">Return</Link>
    </div>
  );
}

export default StarshipPage;
