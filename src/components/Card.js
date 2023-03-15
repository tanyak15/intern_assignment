import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const Card = ({ show }) => {
  return (
    <div className="card mb-3">
      <img
        src={
          show.image
            ? show.image.medium
            : "https://static.tvmaze.com/uploads/images/medium_portrait/75/189678.jpg"
        }
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{show.name}</h5>
        <p className="card-text">
          <small className="text-muted">
            Release Date:{" "}
            {moment(new Date(show.premiered)).format("Do MMMM , YYYY")}
          </small>
        </p>

        <Link
          type="button"
          className="btn btn-primary"
          to={`/details/${show.id}`}
        >
          Watch Now
        </Link>
      </div>
    </div>
  );
};

export default Card;
