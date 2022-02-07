import * as React from "react";

const App: React.FC = () => {
    const greeting = "Hello Function Component!";

    return (
        <h1>
            {greeting}
        </h1>
    );
};

export default App;
