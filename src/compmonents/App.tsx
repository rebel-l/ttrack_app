import "./App.scss";
import * as React from "react";

import { Container, Nav } from "react-bootstrap";
import { useState } from "react";
import Absence from "./absence/Absence";
import Player from "./player/Player";
import Notification from "./Notification";
import PublicHolidays from "./publicholidays/PublicHolidays";
import Reports from "./reports/Reports";
import EditPage from "./timelogs/EditPage";


const App: React.FC = () => {
    const [
            key,
            setKey,
        ] = useState("#player"),

        handleSelect = (eventKey: string) => setKey(eventKey);

    let body : React.JSX.Element;

    switch (key) {
    case "#player":
        body = <Player />;
        break;

    case "#editpage":
        body = <EditPage />;
        break;

    case "#absence":
        body = <Absence />;
        break;

    case "#reports":
        body = <Reports />;
        break;

    case "#publicholidays":
        body = <PublicHolidays />;
        break;
    }

    return (
        <Container fluid={true}>
            <Nav variant="pills"
                activeKey={key}
                onSelect={handleSelect}
            >
                <Nav.Item>
                    <Nav.Link eventKey="#player">
                        Player
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="#editpage">
                        Edit Time Logs
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="#absence">
                        Absence
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="#reports">
                        Reports
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="#publicholidays">
                        Public Holidays
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <Notification />
            {body}
        </Container>
    );
};


export default App;
