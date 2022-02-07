import { Button } from "react-bootstrap";

import React from "react";

class Player extends React.Component<{}, never> {
    shouldComponentUpdate () {
        return false;
    }

    render () {
        return (
            <div className={"justify-content-center"}>
                <Button
                    size="lg"
                    variant="primary"
                >
                    Start
                </Button>
                <Button
                    size="lg"
                    variant="primary"
                >
                    Break
                </Button>
                <Button
                    size="lg"
                    variant="primary"
                >
                    Stop
                </Button>
            </div>
        );
    }
}

export default Player;
