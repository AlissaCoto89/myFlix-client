import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../../navbar/navbar";
import LoginView from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
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
      movies: [],
      user: null,
      favoriteMovies: [],
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

  getMovies(token) {
    axios
      .get("https://my-flix-db-akc.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
    const { Username, FavoriteMovies } = authData.user;
    this.setState({
      user: Username,
      favoriteMovies: FavoriteMovies || [],
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  setIsRegistering(status) {
    this.setState({
      isRegistering: status,
    });
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      selectedMovies: null,
      user: null,
    });
  }

  render() {
    const { movies, user, favoriteMovies } = this.state;
    console.log(favoriteMovies);
    return (
      <Router>
        <Navbar user={user} />
        <Container>
          <Row className="main-view justify-content-md-center">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <Col>
                      <LoginView
                        movies={movies}
                        onLoggedIn={(user) => this.onLoggedIn(user)}
                      />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return movies.map((m) => (
                  <Col sm={3} key={m._id} className="movie-card">
                    <MovieCard movie={m} />
                  </Col>
                ));
              }}
            />
            <Route
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
                return (
                  <Col>
                    <RegistrationView />
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
                      <LoginView
                        movies={movies}
                        onLoggedIn={(user) => this.onLoggedIn(user)}
                      />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                if (!user) return <Redirect to="/" />;
                return (
                  <Col>
                    <ProfileView
                      favoriteMovies={favoriteMovies.map((movieId) => {
                        return movies.find((m) => m._id === movieId);
                      })}
                      user={user}
                      onBackClick={() => history.goBack()}
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
                  <LoginView
                    movies={movies}
                    onLoggedIn={(user) => this.onLoggedIn(user)}
                  />
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

export default MainView;
