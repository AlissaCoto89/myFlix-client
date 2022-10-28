import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Figure, Button, Card } from "react-bootstrap";
import "./profile-view.scss";

function FavoriteMovies({ favoriteMovieList, onRemoveFavorite, movie }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Row>
          <Col>
            <h4>My Favorite Movies</h4>
          </Col>
        </Row>
        <Row>
          {favoriteMovieList.map(() => {
            return (
              <Col sm={12} md={6} lg={4} className="mt-3">
                <Figure>
                  <Link to={`/movies/${movie}`}>
                    <Figure.Image src={ImagePath} alt={Title} />
                    <Figure.Caption>{Title}</Figure.Caption>
                  </Link>
                </Figure>
                <Button
                  variant="danger"
                  onClick={() => onRemoveFavorite(movie)}
                >
                  Remove
                </Button>
              </Col>
            );
          })}
        </Row>
      </Card.Body>
    </Card>
  );
}

export default FavoriteMovies;
