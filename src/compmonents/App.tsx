import "./App.scss";

import * as React from "react";

import { Container } from "react-bootstrap";
import Player from "./player/Player";


const App: React.FC = () => {
    return <Container fluid={true}>
        <Player/>
    </Container>;
};

export default App;
