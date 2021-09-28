import React from "react";

import Leaflet from "leaflet";

import { Marker, Tooltip } from "react-leaflet";
import { Link } from "react-router-dom";

import { Pin } from "./styles";

import PinSvg from "../../../../assets/pin.svg";

const intlMonetary = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 2,
});

export interface IProperty {
  id: number;
  title: String;
  price: number;
  latitude: number;
  longitude: number;
}

export interface IProperties {
  properties: IProperty[];
}

const MapPin = Leaflet.icon({
  iconUrl: PinSvg,
  iconSize: [70, 70],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

const Properties: React.FC<IProperties> = ({ properties }) => (
  <>
    {properties.map((property) => (
      <Marker
        icon={MapPin}
        key={property.id}
        position={[Number(property.latitude), Number(property.longitude)]}
      >
        <Tooltip permanent interactive>
          <Pin>
            <Link to="">{intlMonetary.format(Number(property.price))}</Link>
          </Pin>
        </Tooltip>
      </Marker>
    ))}
  </>
);

export default Properties;
