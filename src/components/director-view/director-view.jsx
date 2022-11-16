import React from "react";
import { Button, Col, Card, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import "./director-view.scss";

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Container className="directorView">
        <Card bg="light" border="dark" text="dark" className="director-view">
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

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
  };
};

export default connect(mapStateToProps)(DirectorView);
