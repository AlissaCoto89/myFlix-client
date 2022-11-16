import React from "react";
import { connect } from "react-redux";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card className="movieCard">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body className="d-flex flex-column justify-content-between">
          <div className="mb-1">
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
          </div>
          <Link to={`/movies/${movie._id}`}>
            <Button className="openBtn" variant="primary">
              Open
            </Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
  };
};

export default connect(mapStateToProps)(MovieCard);
