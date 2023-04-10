import { GoogleMap, Marker } from "@react-google-maps/api";
import { useMemo } from "react";

export default function Map({
  markersFav,
  chosenCenter,
  isLoaded,
  markersVisit,
}) {
  const center = useMemo(() => ({ lat: 3.140853, lng: 101.693207 }), []);

  return !isLoaded ? (
    <div>Loading...</div>
  ) : (
    <GoogleMap
      zoom={10}
      center={chosenCenter ? chosenCenter : center}
      mapContainerClassName="map-container"
      // onClick={(event) => {
      //   setMarkersFav((current) => [
      //     ...current,
      //     {
      //       lat: event.latLng.lat(),
      //       lng: event.latLng.lng(),
      //       time: new Date(),
      //     },
      //   ]);
      // }}
    >
      {markersFav.map((marker) => (
        <Marker
          key={`${marker.lat}_fav_cities`}
          position={{ lat: marker.lat, lng: marker.lng }}
          icon={{
            url: "/heart.png",
            scaledSize: new window.google.maps.Size(30, 30),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
          }}
        />
      ))}
      {markersVisit.map((marker) => (
        <Marker
          key={`${marker.lat}_wanna_visit`}
          position={{ lat: marker.lat, lng: marker.lng }}
          icon={{
            url: "/travel-bag.png",
            scaledSize: new window.google.maps.Size(30, 30),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
          }}
        />
      ))}
    </GoogleMap>
  );
}
