import { useEffect, useState } from "react";
import { Icon } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// components
import Loader from "../../components/Loader";
// constants
import { CountryData, WorldData } from "../../constants/types";
// CSS & icons
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const MapPage = ({ height }: any) => {
  const [countriesData, setCountriesData] = useState<CountryData[]>([]);
  const [worldData, setWorldData] = useState<WorldData | null>(null);
  const [loading, updateLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      updateLoading(true);
      try {
        const [countriesResponse, worldResponse] = await Promise.all([
          fetch("https://disease.sh/v3/covid-19/countries"),
          fetch("https://disease.sh/v3/covid-19/all"),
        ]);
        const countriesData: CountryData[] = await countriesResponse.json();
        const worldData: WorldData = await worldResponse.json();
        setCountriesData(countriesData);
        setWorldData(worldData);
        updateLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const markerIcon = new Icon({
    iconUrl: markerIconPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: markerShadowPng,
    shadowSize: [41, 41],
  });

  const MapContent = () => {
    return (
      <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
        <h2 className="text-2xl font-bold mb-4">Country Specifc Data</h2>
        <MapContainer
          center={[51.505, -0.09]}
          zoom={5}
          style={{ height: height || "100vh", width: "95%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {countriesData.map((country, index: number) => (
            <div key={index}>
              <Marker
                key={country?.country}
                icon={markerIcon}
                position={[
                  country?.countryInfo?.lat,
                  country?.countryInfo?.long,
                ]}
              >
                <Popup>
                  <div>
                    <h2>{country?.country}</h2>
                    <p>Total Cases: {country?.cases}</p>
                    <p>Recovered: {country?.recovered}</p>
                    <p>Deaths: {country?.deaths}</p>
                  </div>
                </Popup>
              </Marker>
            </div>
          ))}
        </MapContainer>
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <Loader>
          <MapContent />
        </Loader>
      ) : (
        <MapContent />
      )}
    </>
  );
};

export default MapPage;
