import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

export default function Search({
  setChosenCenter,
  chosenCity,
  setChosenCity,
  favCitiesHandler,
  wannaVisitHandler,
}) {
  const {
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutoComplete();

  const handleClick = async (val) => {
    setValue(val, false);
    clearSuggestions();

    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);

    const city = { lat, lng };

    const cityName = val.split(", ");
    city["country_name"] = cityName[cityName.length - 1];
    city["city_name"] = cityName[0];

    setChosenCity(city);
    setChosenCenter({ lat, lng });
  };

  const handleClickFavorite = async () => {
    await fetch("http://localhost:8000/favCities", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(chosenCity),
    });

    setValue("");
    setChosenCity("");

    favCitiesHandler();
  };

  const handleClickWannaVisit = async () => {
    await fetch("http://localhost:8000/wannaVisit", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(chosenCity),
    });

    setValue("");
    setChosenCity("");

    wannaVisitHandler();
  };

  const handleClickCenter = () => {
    setChosenCenter({ lat: chosenCity.lat, lng: chosenCity.lng });
  };

  return (
    <div className="container">
      <div className="search-container">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Write a city..."
        ></input>
        <div className="autocomplete-box">
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <option key={place_id} onClick={() => handleClick(description)}>
                {description}
              </option>
            ))}
        </div>
      </div>
      {chosenCity ? (
        <div className="search-result">
          <p>Selected city: {chosenCity.city_name}</p>
          <p>Selected country: {chosenCity.country_name}</p>
          <div className="buttons-selected-city">
            <button onClick={handleClickFavorite}>Add to Favorite</button>
            <button onClick={handleClickWannaVisit}>Add to Wanna Visit</button>
            <button onClick={handleClickCenter}>Center Map</button>
          </div>
        </div>
      ) : (
        <div className="search-result">No chosen city.</div>
      )}
    </div>
  );
}
