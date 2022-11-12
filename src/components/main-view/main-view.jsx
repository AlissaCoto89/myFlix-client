import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setMovies } from "../../actions/actions";
import MoviesList from "../movies-list/movies-list";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import Navbar from "../../navbar/navbar";
import LoginView from "../login-view/login-view";
import MovieView from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { DirectorView } from "../../director-view/director-view";
import { GenreView } from "../../genre-view/genre-view";
import { ProfileView } from "../../profile-view/profile-view";
import "./main-view.scss";

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedMovie: null,
      user: null,
      isRegistering: false,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  setIsRegistering(status) {
    this.setState({
      isRegistering: status,
    });
  }

  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios
      .get("https://my-flix-db-akc.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      selectedMovie: null,
      user: null,
    });
  }

  render() {
    let { movies } = this.props;
    let { user } = this.state;
    return (
      <Router>
        <Navbar user={user} onLogOut={() => this.onLoggedOut()} />
        <Container>
          <Row className="main-view justify-content-md-center">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return <MoviesList movies={movies} />;
              }}
            />
            <Route
              path="/register"
              render={({ history }) => {
                if (user) return <Redirect to="/" />;
                return (
                  <Col>
                    <RegistrationView
                      onSuccessfulRegistration={() => history.push("/")}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path={`/users/${user}`}
              render={({ history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                if (!user) return <Redirect to="/" />;
                return (
                  <Col>
                    <ProfileView
                      movies={movies}
                      onBackClick={() => history.goBack()}
                      onDeletedUser={() => this.onLoggedOut()}
                      onUpdatedUser={(newUserInfo) =>
                        this.onUpdatedUser(newUserInfo)
                      }
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/movies/:movieId"
              render={({ match, history }) => {
                if (!user) return;
                <Col md={4}>
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                </Col>;
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={4}>
                    <MovieView
                      movie={movies.find((m) => m._id === match.params.movieId)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/directors/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <DirectorView
                      director={
                        movies.find(
                          (m) => m.Director.Name === match.params.name
                        ).Director
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/genres/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <GenreView
                      genre={
                        movies.find((m) => m.Genre.Name === match.params.name)
                          .Genre
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies })(MainView);
