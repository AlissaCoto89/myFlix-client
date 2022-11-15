import React from "react";
import PropTypes from "prop-types";
import { Button, Col, Card, Container, Row } from "react-bootstrap";

import "./director-view.scss";

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Container className="directorView">
        <Card className="director-view">
          <Row>
            <Col sm={3} className="label">
              Director:{" "}
            </Col>
            <Col className="value">{director.Name}</Col>
          </Row>
          <Row className="mt-3">
            <Col sm={3} className="label">
              Bio:{" "}
            </Col>
            <Col className="value">{director.Bio}</Col>
          </Row>
          <Row className="mt-3">
            <Col sm={3} className="label">
              Birth:{" "}
            </Col>
            <Col className="value">{director.Birth}</Col>
          </Row>
          <Row className="mt-3">
            <Col sm={3} className="label">
              Death:{" "}
            </Col>
            <Col className="value">{director.Death}</Col>
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

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string,
    Death: PropTypes.string,
  }).isRequired,
};
