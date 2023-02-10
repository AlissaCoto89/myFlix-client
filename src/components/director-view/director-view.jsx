import React from "react";
import { Button, Col, CardGroup, Card, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import "./director-view.scss";

export class DirectorView extends React.Component {
  render() {
    const { movies, director, onBackClick } = this.props;

    return (
      <Card
        style={{ marginTop: 100, marginBottom: 350 }}
        bg="dark"
        text="light"
      >
        <Card.Header className="text-center" as="h5">
          {director.Name}
        </Card.Header>
        <Card.Body>
          <Card bg="dark">
            <div className="movie-director-birth">
              <span className="label">Birth: </span>
              <span className="value">{director.Birth}</span>
            </div>
            <div className="movie-director-death">
              <span className="label">Death: </span>
              <span className="value">{director.Death}</span>
            </div>
            <div className="movie-director-bio">
              <span className="label">Biography: </span>
              <span className="value">{director.Bio}</span>
            </div>
          </Card>
        </Card.Body>
        <Card.Footer className="text-right">
          <Button
            className="button-director-view"
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

export default connect(mapStateToProps)(DirectorView);
