import React, { useCallback, useEffect, useState } from "react";

import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer } from "react-leaflet";

import { Container, ButtonContainer, PointReference } from "./styles";
import Properties, { IProperty } from "./components/Properties";
import api from "../../services/api";

import { removeToken } from "../../services/auth";
import { useHistory, useLocation } from "react-router";
import { Button } from "./components/Button/styles";

type ViewPort = {
  latitude: number;
  longitude: number;
  zoom: number;
};

const Home: React.FC = () => {
  const [viewPort] = useState<ViewPort>({
    latitude: -14.6285612,
    longitude: -57.4997871,
    zoom: 15,
  });

  const [properties, setProperties] = useState<IProperty[]>([]);

  const [addActive, setAddActive] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const loadProperties = useCallback(async () => {
    const { latitude, longitude } = viewPort;

    try {
      const { data } = await api.get("/properties", {
        params: { latitude, longitude },
      });

      setProperties(data);
    } catch (error) {
      console.error(error);
    }
  }, [viewPort]);

  const handleLogout = () => {
    removeToken();
    history.push("/");
  };

  const handleAddProprety = useCallback(() => {
    const { latitude, longitude } = viewPort;

    history.push(
      `${location.pathname}/properties/add?latitude=${latitude}&longitude=${longitude}`
    );

    setAddActive(false);
  }, [viewPort, history, location]);

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  return (
    <Container>
      <MapContainer
        center={[viewPort.latitude, viewPort.longitude]}
        zoom={viewPort.zoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {!addActive && <Properties properties={properties} />}
      </MapContainer>
      <ButtonContainer>
        <Button color="#fc6963" onClick={() => setAddActive(true)}>
          <i className="fa fa-plus" />
        </Button>
        <Button color="#222" onClick={handleLogout}>
          <i className="fa fa-times" />
        </Button>
      </ButtonContainer>
      {addActive && (
        <PointReference>
          <i className="fa fa-map-marker" />
          <div>
            <button onClick={() => handleAddProprety} type="button">
              Adicionar
            </button>
            <button
              onClick={() => setAddActive(false)}
              type="button"
              className="cancel"
            >
              Cancelar
            </button>
          </div>
        </PointReference>
      )}
    </Container>
  );
};

export default Home;
