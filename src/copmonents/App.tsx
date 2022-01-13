import * as React from "react";
import "./app.scss";

import FirstComponent from "./FirstComponent";
import UserComponent from "./UserComponent";

const App: React.FC = () => {
    return (
        <div>
            <h1>Hello, Welcome to React and TypeScript</h1>
            <h2>blubb</h2>
            <FirstComponent />
            <UserComponent name="John Doe" age={25} address="87 Summer St, Boston, MA 02110" dob={new Date()} />
        </div>
    )
}

export default App;
