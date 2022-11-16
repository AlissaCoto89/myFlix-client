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
    <Card className="movieView">
      <Card.Header className="text-center" as="h5">
        {movie.Title}
      </Card.Header>
      <Card.Body>
        <CardGroup>
          <Card bg="light" text="dark">
            <div className="moviePoster">
              <img width="250" src={movie.ImagePath} />
            </div>
            <Card bg="light" border="dark" text="dark">
              <Card.Body className="movie-textarea">
                <span className="movie-description">{movie.Description}</span>
                <div className="directorLink">
                  <span className="label">Director Information: </span>
                  <Link to={`/directors/${movie.Director.Name}`}>
                    <Button variant="link">Director</Button>
                  </Link>
                </div>
                <div className="genreLink">
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
              variant="success"
              onClick={() => addFavorite(currentUser, movie._id)}
            >
              Add Movie to Favorites
            </Button>
          )}
        </Row>
        <Row className="mx-1">
          <Button
            className="backBtn"
            variant="info"
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
