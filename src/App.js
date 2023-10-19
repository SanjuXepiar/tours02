import "./App.css";
import React, { useState, useEffect } from "react";
const url = "https://course-api.com/react-tours-project"; //sample url..

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  // ...Fetching url using fetch function
  const fetchTour = async () => {
    const response = await fetch(url);
    if (response.ok) {
      try {
        const newTour = await response.json();
        setLoading(false);
        setTours(newTour.map((tour) => ({ ...tour, readMore: false })));
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    fetchTour();
  }, []);

  // .....HandleToggle
  const handleToggle = (id) => {
    setTours((prevTour) =>
      prevTour.map((tour) =>
        tour.id === id ? { ...tour, readMore: !tour.readMore } : tour
      )
    );
  };
  // delete Tour button functionality
  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };
  // ....Loading part
  if (loading) {
    return <h1 className="loading"> Loading...</h1>;
  }
  // ....0 tour title with refresh button
  if (tours.length === 0) {
    return (
      <section className="refreshTour">
        <h1>0 Tours Left</h1>
        <button className="refreshButton" onClick={fetchTour}>
          Refresh
        </button>
      </section>
    );
  }

  return (
    <div className="tour">
      <h1 style={{ textDecorationLine: "underline" }}> Tours & Travels</h1>
      {tours.map((tour) => {
        const { id, image, name, info, price } = tour;
        return (
          <section>
            <div key={id} className="tourContainer">
              <img className="tourImg" src={image} alt={name} />
              <div className="imageTitle">
                <h3>{name}</h3>
                <h3>$ {price}</h3>
              </div>
              <p className="info">
                {tour.readMore ? info : `${info.substring(0, 200)}...`}
                <button
                  className="toggleButton"
                  onClick={() => handleToggle(id)}
                >
                  {tour.readMore ? "ShowLess" : "ReadMore"}
                </button>
              </p>
            </div>
            <button className="button" onClick={() => removeTour(id)}>
              Not Interested
            </button>
          </section>
        );
      })}
    </div>
  );
}
export default App;
