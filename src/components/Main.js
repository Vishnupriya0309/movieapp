import axios from "axios";
import React, { useEffect, useState } from "react";
import requests from "../Requests";

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <div className="w-full h-[600px] text-white">
      <div className="w-full h-full relative">
        <div className="absolute w-full h-[600px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">
            {movie?.title}
          </h1>
          <div className="my-4">
            <button className="border bg-yellow-600 text-white border-yellow-300 py-2 px-5">
              Play
            </button>
            <button className="border text-white border-yellow-600 py-2 px-5 ml-4">
              Watch Later
            </button>
          </div>
          <p className="text-gray-400 text-sm">
            Released: {movie?.release_date}
          </p>
          <p className="text-gray-200">
            {truncateString(movie?.overview, windowWidth > 768 ? 150 : 100)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
