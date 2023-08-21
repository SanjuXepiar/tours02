import "./App.css";
import React, { useState, useEffect } from "react";
const url = "https://course-api.com/react-tours-project";

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);
  const [readMore, setReadMore] = useState(false);

  // ...Fetch API
  const fetchTour = async () => {
    const response = await fetch(url);
    const newTour = await response.json();
    setLoading(false);
    setTours(newTour);
    console.log(newTour);
  };
  useEffect(() => {
    fetchTour();
  }, []);
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
      <main className="refreshTour">
        <h1>0 Tours Left</h1>
        <button onClick={fetchTour} className="refreshButton">
          Refr esh
        </button>
      </main>
    );
  }

  return (
    <div className="App">
      <h1> Tours Component</h1>
      {tours.map((tour) => {
        const { id, image, name, info, price } = tour;
        return (
          <section>
            <div key={id} className="sectionCentre">
              <img src={image} alt={name} />
              <div className="imageTitle">
                <h1>{name}</h1>
                <h3>$ {price}</h3>
              </div>
              <p className="info">
                {readMore ? info : `${info.substring(0, 200)}...`}
                <button
                  className="toggleButton"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? "ShowLess" : "ReadMore"}
                </button>
              </p>
            </div>
            <button onClick={() => removeTour(id)} className="button">
              Not Interested
            </button>
            <div className="underline"></div>
          </section>
        );
      })}
    </div>
  );
}
export default App;
