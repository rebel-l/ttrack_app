import { Provider } from "react-redux";
import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./compmonents/App";

import { store } from "./redux/store";

const rootElement = document.getElementById("root");

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    rootElement,
);
