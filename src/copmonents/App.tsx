import "./App.scss";

import * as React from "react";

import { Container, Row } from "react-bootstrap";
import Player from "./player/Player";


const App: React.FC = () => (
    <Container fluid={true}>
        <Player />
    </Container>
)

export default App;
