import { createGlobalStyle } from "styled-components";

import "font-awesome/css/font-awesome.css";

export const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    outline: 0;
}

html, body {
    background: #eee;
    font-family: "Heveltica Neue", "Heveltica", "Arial", sans-serif;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    height: 100%;
    width: 100%;
}

`;
