import React, { useEffect, useState } from "react";

import querySearch from "stringquery";
import classnames from "classnames";

import { Form, File } from "./styles";

import api from "../../services/api";
import { useHistory, useLocation } from "react-router";

const AddProperty: React.FC = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [error, setError] = useState("");
  const [files, setFiles] = useState([]);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const params = querySearch(location.search);

    if (
      !params.hasOwnProperty("latitude") ||
      !params.hasOwnProperty("latitude")
    ) {
      alert("É necessário definir a latitude e longitude para um imovél.");
      history.push("/home");
    }
  }, []);

  return <div />;
};

export default AddProperty;
