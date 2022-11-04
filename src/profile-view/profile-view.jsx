import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";
import "../profile-view/profile-view.scss";

export function ProfileView({
  movies,
  onUpdatedUser,
  onBackClick,
  onDeletedUser,
}) {
  const [user, setUser] = useState();
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  console.log(favoriteMovies);
  const currentUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const getUser = () => {
    axios
      .get(`https://my-flix-db-akc.herokuapp.com/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setFavoriteMovies(
          favoriteMovies.filter((movie) =>
            response.data.favoriteMovies.includes(movie._id)
          )
        );
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getUser();
  }, []);

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
        setFavoriteMovies(response.data.favoriteMovieList);
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
        setFavoriteMovies(response.data.favoriteMovieList);
      })
      .catch((error) => console.error(error));
  };

  useState(() => {
    getFavorite(currentUser);
  }, []);

  return (
    <Container>
      {user && (
        <>
          <Button
            className="mb-2 px-0"
            onClick={() => {
              onBackClick(null);
            }}
            variant="link"
          >
            Back
          </Button>

          <Row>
            <Col md={12} lg={4}>
              <Card className="mb-3">
                <Card.Body>
                  <UserInfo name={user?.Username} email={user?.Email} />
                </Card.Body>
              </Card>
            </Col>
            <Col md={12} lg={8}>
              <Card className="mb-3">
                <Card.Body>
                  <UpdateUser user={user} handleSubmit={onUpdatedUser} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <FavoriteMovies
            favoriteMovieList={favoriteMovies}
            onRemoveFavorite={(movieId) => removeFavorite(movieId)}
          />
        </>
      )}
    </Container>
  );
}
