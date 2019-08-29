import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import Page from "./page";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<Page />, document.getElementById("root"));

serviceWorker.unregister();
