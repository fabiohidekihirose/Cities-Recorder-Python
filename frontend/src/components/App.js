import "../styles/App.css";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FavoriteCitiesView from "./FavoriteCitiesView";
import WannaVisitView from "./WannaVisitView";
import Map from "./Map";
import Search from "./Search";
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

function App() {
  const [favCities, setFavCities] = useState("");
  const [currentView, setCurrentView] = useState("select-country");
  const [wannaVisit, setWannaVisit] = useState("");
  const [markersFav, setMarkersFav] = useState([]);
  const [markersVisit, setMarkersVisit] = useState([]);
  const [chosenCenter, setChosenCenter] = useState("");
  const [chosenCity, setChosenCity] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    favCitiesHandler();
    wannaVisitHandler();
    getAllComments();
  }, []);

  const addCommentHandler = async (comment, city) => {
    const commentObj = {
      city_name: city,
      comment: comment.value,
    };

    comment.value = "";

    await fetch("http://localhost:8000/comments", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(commentObj),
    });

    getAllComments();
  };

  const toggleComments = (current) => {
    if (current.style.display === "block") {
      current.style.display = "none";
    } else {
      current.style.display = "block";
    }
  };

  const getAllComments = async () => {
    const allCommentsData = await fetch("http://localhost:8000/comments");
    const allComments = await allCommentsData.json();

    setComments(allComments);
  };

  const deleteCommentHandler = async (id) => {
    await fetch("http://localhost:8000/comments?id=" + id, {
      method: "DELETE",
    });

    getAllComments();
  };

  async function favCitiesHandler() {
    const favCitiesData = await fetch("http://localhost:8000/favCities");
    const favCities = await favCitiesData.json();

    setFavCities(favCities);

    const favCitiesLatLng = favCities.map((city) => {
      return { lat: city.lat, lng: city.lng };
    });

    setMarkersFav(favCitiesLatLng);
  }

  async function wannaVisitHandler() {
    const wannaVisitData = await fetch("http://localhost:8000/wannaVisit");
    const wannaVisit = await wannaVisitData.json();

    setWannaVisit(wannaVisit);

    const wannaVisitLatLng = wannaVisit.map((city) => {
      return { lat: city.lat, lng: city.lng };
    });

    setMarkersVisit(wannaVisitLatLng);
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDKm-NUfaN6t7MnSycu06qzO1nvSE0u3R4",
    libraries,
  });

  return (
    <div className="App">
      <Navbar setCurrentView={setCurrentView} setWannaVisit={setWannaVisit} />
      <div className="content-container">
        <Map
          markersFav={markersFav}
          markersVisit={markersVisit}
          chosenCenter={chosenCenter}
          isLoaded={isLoaded}
        ></Map>
        <div className="cities-search">
          {isLoaded ? (
            <Search
              setChosenCenter={setChosenCenter}
              setChosenCity={setChosenCity}
              chosenCity={chosenCity}
              favCitiesHandler={favCitiesHandler}
              wannaVisitHandler={wannaVisitHandler}
            />
          ) : null}

          {currentView === "favorite-cities" ? (
            <FavoriteCitiesView
              favCities={favCities}
              setChosenCenter={setChosenCenter}
              favCitiesHandler={favCitiesHandler}
              getAllComments={getAllComments}
              comments={comments}
              deleteCommentHandler={deleteCommentHandler}
              toggleComments={toggleComments}
              addCommentHandler={addCommentHandler}
            />
          ) : null}

          {currentView === "wanna-visit" ? (
            <WannaVisitView
              wannaVisit={wannaVisit}
              setChosenCenter={setChosenCenter}
              wannaVisitHandler={wannaVisitHandler}
              getAllComments={getAllComments}
              comments={comments}
              deleteCommentHandler={deleteCommentHandler}
              toggleComments={toggleComments}
              addCommentHandler={addCommentHandler}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
