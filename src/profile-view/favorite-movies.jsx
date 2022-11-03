import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Figure, Button, Card } from "react-bootstrap";
import "./profile-view.scss";

function FavoriteMovies({ favoriteMovieList, movie }) {
  console.log(favoriteMovieList);
  return (
    <Card className="mb-3">
      <Card.Body>
        <Row>
          <Col>
            <h5>Favorite Movies</h5>
          </Col>
        </Row>
        <Row>
          {favoriteMovieList.map(({ ImagePath, Title }) => {
            return (
              <Col sm={12} md={6} lg={4} className="mt-3">
                <Link to={`/movies/${movie}`}>
                  <Image src={ImagePath} alt={Title} />
                  <Caption>{Title}</Caption>
                </Link>
              </Col>
            );
          })}
        </Row>
      </Card.Body>
    </Card>
  );
}

export default FavoriteMovies;
