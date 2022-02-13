import { Button } from "react-bootstrap";

import React from "react";

import { TimeLogs } from "../../models/TimeLog";

interface IState {
    timeLogs: TimeLogs
}

const buttonVariant = (canCLick : boolean) : string => {
        let variant = "primary";

        if (!canCLick) {
            variant = "secondary";
        }

        return variant;
    },
    labelBreak = "Break",
    labelStart = "Start",
    labelStop = "Stop";

class Player extends React.Component<unknown, IState> {
    constructor (props) {
        super(props);

        this.state = { timeLogs: [] as TimeLogs };

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

        timeLogs[timeLogs.length - 1].Stop = new Date();

        timeLogs.push({
            Start: new Date(),
            Reason: "break",
            Location: "home",
        });

        this.setState({ timeLogs });
    }

    canBreak () : boolean {
        const { timeLogs } = this.state,
            last = timeLogs[timeLogs.length - 1];

        return timeLogs.length > 0 && typeof last.Stop === "undefined" && last.Reason !== "break";
    }

    handleStart () : void {
        const { timeLogs } = this.state;

        if (!this.canStart()) {
            return;
        }

        if (timeLogs.length > 0) {
            const last = timeLogs[timeLogs.length - 1];

            if (typeof last.Stop === "undefined" && last.Reason === "break") {
                last.Stop = new Date();
            }
        }

        timeLogs.push({
            Start: new Date(),
            Reason: "work",
            Location: "home",
        });

        this.setState({ timeLogs });
    }

    canStart () : boolean {
        const { timeLogs } = this.state,
            last = timeLogs[timeLogs.length - 1];

        return timeLogs.length === 0 || typeof last.Stop !== "undefined" || last.Reason === "break";
    }

    handleStop () : void {
        const { timeLogs } = this.state;

        if (!this.canStop()) {
            return;
        }

        timeLogs[timeLogs.length - 1].Stop = new Date();

        this.setState({ timeLogs });
    }

    canStop () : boolean {
        const { timeLogs } = this.state;

        return timeLogs.length > 0 && typeof timeLogs[timeLogs.length - 1].Stop === "undefined";
    }

    render () : React.ReactNode {
        return (
            <div className="justify-content-center">
                <Button
                    onClick={this.handleStart}
                    size="lg"
                    variant={buttonVariant(this.canStart())}
                >
                    {labelStart}
                </Button>
                <Button
                    onClick={this.handleBreak}
                    size="lg"
                    variant={buttonVariant(this.canBreak())}
                >
                    {labelBreak}
                </Button>
                <Button
                    onClick={this.handleStop}
                    size="lg"
                    variant={buttonVariant(this.canStop())}
                >
                    {labelStop}
                </Button>
            </div>
        );
    }
}

export default Player;
