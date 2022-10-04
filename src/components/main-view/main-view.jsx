import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [
        { _id: "632b5e910d672a0abeeeb3e3", 
        Title: "Bridesmaids", 
        Description: "Competition between the maid of honor and a bridesmaid, over who is the bride's best friend, threatens to upend the life of an out-of-work pastry chef.", 
        ImagePath: "https://m.media-amazon.com/images/I/71NSaiNKO9L._AC_SL1333_.jpg"},
        { _id: "632b58580d672a0abeeeb3e1", 
        Title: "Iron Man", 
        Description: "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.", 
        ImagePath: "https://www.previewsworld.com/SiteImage/MainImage/STL206028.jpg"},
        { _id: "632b69dc0d672a0abeeeb3e6", 
        Title: "Pretty Woman", 
        Description: "A man in a legal but hurtful business needs an escort for some social events, and hires a beautiful prostitute he meets, only to fall in love.", 
        ImagePath: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTDTHnd0HSjj9GDi8-rOC6vXCvO7J4GqmuNbFjQ58NPrAh_l0p8"}
      ],
      selectedMovie: null 
  };
}

setSelectedMovie(newSelectedMovie) {
  this.setState({
    selectedMovie: newSelectedMovie
  });
}

render() {
  const { movies, selectedMovie } = this.state;


  if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

  return (
    <div className="main-view">
      {selectedMovie
        ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
        : movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
        ))
      }
    </div>
  );
}
}
// export default MainView;
