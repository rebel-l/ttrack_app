import "./App.scss";

import * as React from "react";

import { Container } from "react-bootstrap";
import Player from "./player/Player";
import Error from "./Error";


const App: React.FC = () => (
    <Container fluid={true}>
        <Error />
        <Player />
    </Container>
);

export default App;
