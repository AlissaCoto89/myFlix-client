import React from "react";
import { connect } from "react-redux";
import { Button, Col, Card, Container, Row } from "react-bootstrap";

import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Container className="genreView">
        <Card bg="light" border="dark" text="dark" className="genre-card">
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

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
  };
};

export default connect(mapStateToProps)(GenreView);
