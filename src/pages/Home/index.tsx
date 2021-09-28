import React, { useCallback, useEffect, useState } from "react";

import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer } from "react-leaflet";

import { Container, ButtonContainer } from "./styles";
import Properties, { IProperty } from "./components/Properties";
import api from "../../services/api";

import { removeToken } from "../../services/auth";
import { useHistory } from "react-router";
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

  const history = useHistory();

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
        <Properties properties={properties} />
      </MapContainer>
      <ButtonContainer>
        <Button color="#222" onClick={handleLogout}>
          <i className="fa fa-times" />
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default Home;
