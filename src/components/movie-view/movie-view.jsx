import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { CardGroup, Button, Card, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export default function MovieView({ movie, onBackClick }) {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const currentUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const getFavorite = (username) => {
    axios
      .get(`https://my-flix-db-akc.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setFavoriteMovies(response.data.FavoriteMovies);
      })
      .catch((error) => console.error(error));
  };

  addFavorite = (username, movieId) => {
    console.log(username);
    console.log(movieId);
    console.log(token);

    axios
      .post(
        `https://my-flix-db-akc.herokuapp.com/users/${username}/movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setFavoriteMovies(response.data.FavoriteMovies);
      })
      .catch((error) => console.error(error));
  };

  const removeFavorite = (username, movieId) => {
    axios
      .delete(
        `https://my-flix-db-akc.herokuapp.com/users/${username}/movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setFavoriteMovies(response.data.FavoriteMovies);
      })
      .catch((error) => console.error(error));
  };

  useState(() => {
    getFavorite(currentUser);
  }, []);

  return (
    <Card bg="light" text="dark">
      <Card.Header className="text-center" as="h5">
        {movie.Title}
      </Card.Header>
      <Card.Body>
        <CardGroup>
          <Card bg="light" border="dark" text="dark">
            <Card.Img className="movie-poster" as="img" src={movie.ImagePath} />
            <Card bg="light" border="dark" text="dark">
              <Card.Body className="movie-textarea">
                <span className="movie-description">{movie.Description}</span>
                <div className="movie-director-link">
                  <span className="label">Director Information: </span>
                  <Link to={`/directors/${movie.Director.Name}`}>
                    <Button variant="link">Director</Button>
                  </Link>
                </div>
                <div className="movie-genre-link">
                  <span className="label">Genre Information: </span>
                  <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button variant="link">Genre</Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Card>
        </CardGroup>
      </Card.Body>
      <Card.Footer>
        <Row className="mx-0">
          {favoriteMovies.includes(movie._id) ? (
            <Button
              variant="danger"
              onClick={() => removeFavorite(currentUser, movie._id)}
            >
              Remove Movie from Favorites
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => addFavorite(currentUser, movie._id)}
            >
              Add Movie to Favorites
            </Button>
          )}
        </Row>
        <Row className="mx-1">
          <Button
            className="button-movie-view"
            variant="secondary"
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </Button>
        </Row>
      </Card.Footer>
    </Card>
  );
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Actors: PropTypes.array.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string,
      Death: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
