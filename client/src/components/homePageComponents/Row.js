import React, { useState, useEffect, Fragment } from "react";
import axios from "../../utils/axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

import classes from "./Row.module.css";

const base_url = "https://image.tmdb.org/t/p/original";
const APIKEY = "e434f86986f13f690168c613031343da";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [trailerUrl, setTrailerUrl] = useState();
  const [movies, setMovies] = useState([]);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    };
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl(undefined);
    } else {
      console.log(movie?.name);
      movieTrailer(null, { apiKey: APIKEY, tmdbId: movie.id })
        .then((url) => {
          console.log(url);
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) =>
          alert(
            "Sorry, that video is not available.  Please select a different title."
          )
        );
    }
  };

  const showCartHandler = (i) => {
    setIsShown(i);
  };

  const hideCartHandler = () => {
    setIsShown(-1);
  };

  return (
    <div className={classes.row}>
      <h2>{title}</h2>
      <div className={`${classes.row__posters}`}>
        {movies.map((movie, i) => (
          <div
            className={classes.poster__container}
            onMouseLeave={hideCartHandler}
            onMouseEnter={() => showCartHandler(i)}
          >
            <img
              className={`${classes.row__poster} ${
                isLargeRow && classes.row__posterLarge
              }`}
              onClick={() => handleClick(movie)}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.title}
              key={movie.id}
            />
            <p
              className={
                isShown === i
                  ? classes.poster__title__shown
                  : classes.poster__title__hide
              }
            >
              {movie.name || movie.title}
            </p>
          </div>
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
