import * as React from "react";
import * as ReactDOMClient from "react-dom/client";

import App from "./compmonents/App";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);

// NOTE: use React.StrictMode only for development as it forces React alsways to render twice
// root.render(
//     <React.StrictMode>
//         <Provider store={store}>
//             <App/>
//         </Provider>
//     </React.StrictMode>,
// );

root.render(
    <Provider store={store}>
        <App/>
    </Provider>,
);
