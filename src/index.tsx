import * as React from "react";
import * as ReactDOMClient from "react-dom/client";

import App from "./compmonents/App";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const
    container = document.getElementById("root"),
    root = ReactDOMClient.createRoot(container);

/* eslint-disable  multiline-comment-style, capitalized-comments */
// NOTE: use React.StrictMode only for development as it forces React alsways to render twice
// root.render(
//     <React.StrictMode>
//         <Provider store={store}>
//             <App/>
//         </Provider>
//     </React.StrictMode>,
// );
/* eslint-enable  multiline-comment-style, capitalized-comments */

root.render( // eslint-disable-line function-paren-newline
    <Provider store={store}>
        <App />
    </Provider>,
); // eslint-disable-line function-paren-newline
