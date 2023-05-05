import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { getAllShows } from "../api/shows";

const HomePage = () => {
  const [shows, setShows] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getAllShows().then(({ shows }) => {
      setDataLoaded(true);
      setShows(shows);
    });
  }, []);

  const renderList = () => {
    return shows.map((show) => {
      return (
        <div className="col-md-4 p-4" key={show.id}>
          <Card show={show} key={show.id} />
        </div>
      );
    });
  };

  return (
    <div className="p-3 d-flex flex-column ">
      <div
        className="p-1 fs-1 rounded d-flex justify-content-center
         align-items-center text-white font-semibold"
        style={{
          backgroundColor: "rgb(25, 106, 110)",
          fontFamily: "cursive",
        }}
      >
        ShowTanyy
      </div>
      <div className="row">
        {dataLoaded ? (
          renderList()
        ) : (
          <div className="vh-100 d-flex justify-content-center align-items-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
