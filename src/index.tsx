import * as React from "react";
import * as ReactDOM from "react-dom";
import FirstComponent from "./copmonents/FirstComponent";
import UserComponent from "./copmonents/UserComponent";

ReactDOM.render(
    <div>
        <h1>Hello, Welcome to React and TypeScript</h1>
        <FirstComponent />
        <UserComponent name="John Doe" age={25} address="87 Summer St, Boston, MA 02110" dob={new Date()} />
    </div>,
    document.getElementById("root")
);
