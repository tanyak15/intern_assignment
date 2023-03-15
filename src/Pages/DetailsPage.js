import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getShowData } from "../api/shows";
import { formatSummary } from "../utils/formatSummary";
import moment from "moment";

const DetailsPage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchData = async () => {
    const data = await getShowData(+id);
    data.genres = data.genres.join(",");
    setDetails(data);
    setDataLoaded(true);
    console.log("\x1b[36m", "👍👍👍", data);
  };

  const ref = useRef(null);
  const closeref = useRef(null);

  const [state, setstate] = useState(
    localStorage.getItem("user-details") ?? {
      tickets: "",
      name: "",
      email: "",
    }
  );

  const handelChange = (e) => {
    console.log("\x1b[35m", "👉👉👉 state :", state);
    setstate({ ...state, [e.target.name]: e.target.value });
  };

  const saveChanges = (e) => {
    localStorage.setItem("user-details", JSON.stringify(state));
    closeref.current.click();
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (dataLoaded && details) {
    return (
      <>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {details.name} 🎫
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-2">
                  <label htmlFor="text" className="form-label ">
                    Number Of Tickets
                  </label>
                  <input
                    onChange={handelChange}
                    value={state.tickets}
                    name="tickets"
                    type="number"
                    className="form-control"
                    id="tickets"
                    min={0}
                    max={20}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="text" className="form-label">
                    Name
                  </label>
                  <input
                    onChange={handelChange}
                    value={state.name}
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                  ></input>
                </div>
                <div className="mb-2">
                  <label htmlFor="text" className="form-label">
                    Email
                  </label>
                  <input
                    onChange={handelChange}
                    value={state.email}
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                  ></input>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  ref={closeref}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  onClick={saveChanges}
                  type="button"
                  className="btn btn-primary"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container vh-100">
          <div className="row">
            <div className="col-md-3 show-image h-100">
              <img
                loading="lazy"
                src={details.image?.original}
                alt="All American"
                className="h-100 w-100"
              />
            </div>
            <div className="col-md-9">
              <h1>{details.name}</h1>
              <p>
                <strong>Type:</strong> {details.type}
              </p>
              <p>
                <strong>Genres:</strong> {details.genres}
              </p>
              <p>
                <strong>Status:</strong> {details.status}
              </p>
              <p>
                <strong>Runtime:</strong> {details.runtime} minutes
              </p>
              <p>
                <strong>Premiered:</strong>{" "}
                {moment(new Date(details.premiered)).format("Do MMMM , YYYY")}
              </p>
              <p>
                <strong>Network:</strong> {details.network?.name}
              </p>
              <p>
                <strong>Rating:</strong> {details.rating?.average}
              </p>
              <p>
                <strong>Summary:</strong>
              </p>
              <p className="show-summary">{formatSummary(details.summary)}</p>
              <button
                type="button"
                ref={ref}
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Book Tickets
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default DetailsPage;
