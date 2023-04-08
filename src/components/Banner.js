import axios from "../axios";
import requests from "../requests";
import "./Banner.css";
import React, { useEffect, useState } from "react";

function Banner() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function moviesData() {
      const response = await axios.get(requests.fetchNetflixOriginals);
      setMovies(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length - 1)
        ]
      );
      return response;
    }
    moviesData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movies?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__content">
        <h1 className="banner__title">
          {movies?.title || movies?.name || movies?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="play__button">Play</button>
          <button className="play__button">List</button>
        </div>
        <div className="banner_description">
          {truncate(movies?.overview, 150)}
        </div>
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  );
}

export default Banner;
