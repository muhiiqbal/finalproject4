import { useSelector } from "react-redux";
import React from "react";
import { useNavigate } from "react-router-dom";

const MoviePage = () => {
  const navigate = useNavigate();
  const { detail } = useSelector((state) => state.movie);

  return (
    <div class="container mt-5">
      <div class="text-start mb-3">
        <button className="btn btn-outline-primary" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <img src={detail.Poster} alt="Movie Poster" className="detail-image" />
        </div>
        <div class="col-sm-6 text-start">
          <p className="fw-bold">{detail.imdbRating} ⭐</p>
          <h1>
            {detail.Title} {detail.Year}
          </h1>
          <h6>{detail.Genre}</h6>
          <p>{detail.Plot}</p>
          <h5 className="text-secondary">{detail.Runtime}</h5>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
