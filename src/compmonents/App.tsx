import "./App.scss";
import * as React from "react";

import { Container, Nav } from "react-bootstrap";
import { useState } from "react";
import Absence from "./absence/Absence";
import Player from "./player/Player";
import Notification from "./Notification";


const App: React.FC = () => {
    const [key, setKey] = useState("#player");

    const handleSelect = (eventKey: string) => setKey(eventKey)

    let body : React.JSX.Element;

    switch (key) {
    case "#player":
        body = <Player />;
        break;
    case "#absence":
        body = <Absence />;
        break;
    }

    return (
        <Container fluid={true}>
            <Nav variant="pills" activeKey={key} onSelect={handleSelect}>
                <Nav.Item>
                    <Nav.Link eventKey="#player">Player</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="#absence">Absence</Nav.Link>
                </Nav.Item>
            </Nav>
            <Notification />
            {body}
        </Container>
    );
};


export default App;
