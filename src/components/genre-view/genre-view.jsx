import React from "react";
import PropTypes from "prop-types";
import { Button, Col, Card, Container, Row } from "react-bootstrap";

import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Container className="genreView">
        <Card className="genre-card">
          <Row>
            <Col sm={3} className="label">
              Genre:{" "}
            </Col>
            <Col className="value">{genre.Name}</Col>
          </Row>
          <Row className="mt-3">
            <Col sm={3} className="label">
              Description:{" "}
            </Col>
            <Col className="value">{genre.Description}</Col>
          </Row>
          <Row></Row>
        </Card>

        <Button
          className="backBtn"
          onClick={() => {
            onBackClick(null);
          }}
          variant="info"
        >
          Back
        </Button>
      </Container>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};
