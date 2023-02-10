import React, { useEffect, useState } from "react";
import axios from "axios";
import { CardGroup, Button, Card, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./movie-view.scss";

export function MovieView({ movie, onBackClick }) {
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

  const addFavorite = (username, movieId) => {
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

  useEffect(() => {
    getFavorite(currentUser);
  }, []);

  return (
    <Card style={{ marginTop: 50, marginBottom: 350 }} bg="dark" text="light">
      <Card.Header className="text-center" as="h5">
        {movie.Title}
      </Card.Header>
      <Card.Body>
        <CardGroup>
          <Card bg="dark" border="dark" text="light">
            <Card.Body className="movie-textarea">
              <div className="movie-genre-link">
                <span className="label">Genre: </span>
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button variant="link">{movie.Genre.Name}</Button>
                </Link>
                <div className="movie-director-link">
                  <span className="label">Director: </span>
                  <Link to={`/directors/${movie.Director.Name}`}>
                    <Button variant="link">{movie.Director.Name}</Button>
                  </Link>
                </div>
              </div>
              <span className="movie-description">{movie.Description}</span>
            </Card.Body>
          </Card>
          <Card bg="dark" border="dark" text="light">
            <Card.Img
              className="movie-poster"
              as="img"
              crossOrigin="anonymous | use-credentials"
              src={movie.ImagePath}
            />
          </Card>
        </CardGroup>
      </Card.Body>
      <Card.Footer className="text-right">
        <Row className="mx-0">
          {favoriteMovies.includes(movie._id) ? (
            <Button
              className="removeFavorite"
              variant="warning"
              onClick={() => removeFavorite(currentUser, movie._id)}
            >
              Remove Movie from Favorites
            </Button>
          ) : (
            <Button
              className="addFavorite"
              variant="info"
              onClick={() => addFavorite(currentUser, movie._id)}
            >
              Add Movie to Favorites
            </Button>
          )}

          <Button
            className="back-button-movie-view"
            variant="link"
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

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
  };
};

export default connect(mapStateToProps)(MovieView);
