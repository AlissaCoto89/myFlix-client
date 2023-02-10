import React from "react";
import { connect } from "react-redux";
import { Button, Col, Card, Container, Row } from "react-bootstrap";

import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Card
        style={{ marginTop: 100, marginBottom: 350 }}
        bg="dark"
        text="light"
      >
        <Card.Header className="text-center" as="h5">
          {genre.Name}
        </Card.Header>
        <Card.Body className="genre-textarea">
          <Card bg="dark" border="dark" text="light">
            <div className="movie-genre-description">
              <span className="label">Description: </span>
              <span className="value">{genre.Description}</span>
            </div>
          </Card>
        </Card.Body>
        <Card.Footer className="text-right">
          <Button
            className="button-genre-view"
            variant="secondary"
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </Button>
        </Card.Footer>
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

export default connect(mapStateToProps)(GenreView);
