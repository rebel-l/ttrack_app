import { Button } from "react-bootstrap";

import React from "react";

import Timelog from "../../models/Timelog";

interface IState {
    timeLogs: Timelog[]
}

class Player extends React.Component<unknown, IState> {
    constructor (props) {
        super(props);

        this.state = { timeLogs: [] as Timelog[] };

        this.handleBreak = this.handleBreak.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);

        this.canBreak = this.canBreak.bind(this);
        this.canStart = this.canStart.bind(this);
        this.canStop = this.canStop.bind(this);
    }

    shouldComponentUpdate (nextProps: unknown, nextState: IState) : boolean {
        console.log(this.state, nextState); // eslint-disable-line

        return true;
    }

    handleBreak () : void {
        const { timeLogs } = this.state;

        if (!this.canBreak()) {
            return;
        }

        timeLogs[timeLogs.length-1].Stop = new Date();

        timeLogs.push({
            Start: new Date(),
            Reason: "break",
            Location: "home",
        });

        this.setState({timeLogs: timeLogs});
    }

    canBreak () : boolean {
        const { timeLogs } = this.state;

        const last = timeLogs[timeLogs.length-1];

        return timeLogs.length > 0 && last.Stop === undefined && last.Reason !== "break";
    }

    handleStart () : void {
        const { timeLogs } = this.state;

        if (!this.canStart()) {
            return;
        }

        if (timeLogs.length > 0) {
            const last = timeLogs[timeLogs.length-1];
            if (last.Stop === undefined && last.Reason === "break") {
                last.Stop = new Date();
            }
        }

        timeLogs.push({
            Start: new Date(),
            Reason: "work",
            Location: "home",
        });

        this.setState({timeLogs: timeLogs});
    }

    canStart () : boolean {
        const { timeLogs } = this.state;

        const last = timeLogs[timeLogs.length-1];

        return timeLogs.length === 0 || last.Stop !== undefined || last.Reason === "break";
    }

    handleStop ()  : void  {
        const { timeLogs } = this.state;

        if (!this.canStop()) {
            return;
        }

        timeLogs[timeLogs.length-1].Stop = new Date();

        this.setState({timeLogs: timeLogs});
    }

    canStop () : boolean {
        const { timeLogs } = this.state;

        return timeLogs.length > 0 && timeLogs[timeLogs.length-1].Stop === undefined;
    }

    render () : React.ReactNode {
        return (
            <div className="justify-content-center">
                <Button
                    onClick={this.handleStart}
                    size="lg"
                    variant={buttonVariant(this.canStart())}
                >
                    Start
                </Button>
                <Button
                    onClick={this.handleBreak}
                    size="lg"
                    variant={buttonVariant(this.canBreak())}
                >
                    Break
                </Button>
                <Button
                    onClick={this.handleStop}
                    size="lg"
                    variant={buttonVariant(this.canStop())}
                >
                    Stop
                </Button>
            </div>
        );
    }
}

function buttonVariant (canCLick : boolean) : string {
    let variant : string = "primary";

    if (!canCLick) {
        variant = "secondary";
    }

    return variant;
}

export default Player;
