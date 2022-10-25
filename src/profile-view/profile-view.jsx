import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
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
  const currentUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const getUser = () => {
    axios
      .get("https://my-flix-db-akc.herokuapp.com/users/${user}", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setFavoriteMovies(
          movies.filter((movie) =>
            response.data.FavoriteMovies.includes(movie._id)
          )
        );
      })
      .catch((error) => console.error(error));
  };

  const removeFavorite = (movieId) => {
    axios
      .delete(
        "https://my-flix-db-akc.herokuapp.com/users/${currentUser}/movies/${movieId}",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setUser(response.data);
        setFavoriteMovies(
          movies.filter((movie) =>
            response.data.FavoriteMovies.includes(movie._id)
          )
        );
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getUser();
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
          <FavoriteMovies />
        </>
      )}
    </Container>
  );
}
