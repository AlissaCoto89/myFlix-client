import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Figure, Button, Card } from "react-bootstrap";
import "./profile-view.scss";

function FavoriteMovies({ favoriteMovieList, onRemoveFavorite }) {
  return (
    <Card className="favMovies">
      <Card.Body>
        <Row>
          <Col className="text-center">
            <h5>Favorite Movies</h5>
          </Col>
        </Row>
        <Row>
          {favoriteMovieList.map(({ ImagePath, Title, _id }) => {
            return (
              <Col
                sm={12}
                md={6}
                lg={4}
                className="fav-movie"
                key={`fav-${_id}`}
              >
                <Figure>
                  <Link to={`/movies/${_id}`}>
                    <Figure.Image src={ImagePath} alt={Title} />
                    <Figure.Caption>{Title}</Figure.Caption>
                  </Link>
                </Figure>
                <Button variant="danger" onClick={() => onRemoveFavorite(_id)}>
                  Remove from Favorite Movies
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
