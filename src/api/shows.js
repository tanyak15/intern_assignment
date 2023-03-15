import axios from "axios";

export const getAllShows = async () => {
  const { data } = await axios.get("https://api.tvmaze.com/search/shows?q=all");

  const scores = data.map((item) => {
    return {
      score: item.score,
      id: item.show.id,
    };
  });

  const shows = data.map((item) => item.show);
  return {
    shows,
    scores,
  };
};

export const getShowData = async (id) => {
  const requiredShow = (await getAllShows()).shows.find(
    (show) => show.id === id
  );
  return requiredShow;
};
