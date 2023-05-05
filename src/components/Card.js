import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ show }) => {
  return (
    <div
      className="card mb-3 rounded"
      style={{
        border: "4px solid rgb(15, 97, 101)",
        backgroundColor: "rgb(136, 198, 201)",
      }}
    >
      <img
        src={
          show.image
            ? show.image.medium
            : "https://static.tvmaze.com/uploads/images/medium_portrait/75/189678.jpg"
        }
        className="card-img-top "
        alt="..."
      />
      <div className="card-body ">
        <h5 className="card-title fs-3 d-flex justify-content-center">
          {show.name}
        </h5>
        <p className="card-text d-flex justify-content-center fs-6 fw-semibold">
          <small className="text-muted">
            Release Date:{" "}
            {moment(new Date(show.premiered)).format("Do MMMM , YYYY")}
          </small>
        </p>

        <Link
          type="button"
          className="btn btn-primary d-flex justify-content-center"
          to={`/details/${show.id}`}
        >
          Watch Now
        </Link>
      </div>
    </div>
  );
};

export default Card;
