import "@babel/polyfill";

import React from "react";
import ReactDOM from "react-dom";

import "./styles/main.scss";
import { AppRouter } from "./routing/app-router";

const App = (): JSX.Element =>
    (
        <AppRouter></AppRouter>
    );

ReactDOM.render(<App></App>, document.getElementById("root"));
