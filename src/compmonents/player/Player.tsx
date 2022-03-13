import "./Player.scss";
import { connect } from "react-redux";

import { Break, Work } from "../../models/Reason";
import { Button, Form } from "react-bootstrap";
import React from "react";
import { set } from "../../redux/timelog/timelogs";
import { Locations } from "../../models/Location";
import { TimeLogs } from "../../models/TimeLogs";

const buttonVariant = (canCLick : boolean) : string => {
        let variant = "primary";

        if (!canCLick) {
            variant = "secondary";
        }

        return variant;
    },
    // dispatch = useAppDispatch(),
    labelBreak = "Break",
    labelLocation = "Working from: ",
    labelStart = "Start",
    labelStop = "Stop",
    mapDispatch = {set},
    mapState = () => ({}),
    connector = connect(mapState, mapDispatch);

interface IState {
    timeLogs: TimeLogs
    location: string
    locationOptions: React.ReactNode[]
}

class Player extends React.Component<unknown, IState> {
    constructor (props) {
        super(props);

        const locationOptions : React.ReactNode[] = [];

        Locations.forEach((value: string) => {
            locationOptions.push(<option>{value}</option>); // eslint-disable-line react/jsx-one-expression-per-line
        });

        this.state = {
            timeLogs: [] as TimeLogs,
            location: Locations[0],
            locationOptions,
        };

        this.handleLocation = this.handleLocation.bind(this);

        this.handleBreak = this.handleBreak.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);

        this.canBreak = this.canBreak.bind(this);
        this.canStart = this.canStart.bind(this);
        this.canStop = this.canStop.bind(this);
    }

    shouldComponentUpdate (nextProps: unknown, nextState: IState) : boolean {
        // console.log("RESULT", nextState); // eslint-disable-line no-console

        return true;
    }

    handleBreak () : void {
        const { location, timeLogs } = this.state;

        if (!this.canBreak()) {
            return;
        }

        timeLogs[timeLogs.length - 1].Stop = new Date().toString();

        timeLogs.push({
            Start: new Date().toString(),
            Reason: Break,
            Location: location,
        });

        this.props.set(timeLogs);

        // eslint-disable-next-line
        this.setState({ timeLogs }); // TODO: use redux
    }

    canBreak () : boolean {
        const { timeLogs } = this.state,
            last = timeLogs[timeLogs.length - 1];

        return timeLogs.length > 0 && typeof last.Stop === "undefined" && last.Reason !== "break";
    }

    handleStart () : void {
        const { location, timeLogs } = this.state;

        if (!this.canStart()) {
            return;
        }

        if (timeLogs.length > 0) {
            const last = timeLogs[timeLogs.length - 1];

            if (typeof last.Stop === "undefined" && last.Reason === "break") {
                last.Stop = new Date().toString();
            }
        }

        timeLogs.push({
            Start: new Date().toString(),
            Reason: Work,
            Location: location,
        });

        this.props.set(timeLogs);

        // eslint-disable-next-line
        this.setState({ timeLogs }); // TODO: use redux
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

        timeLogs[timeLogs.length - 1].Stop = new Date().toString();

        this.props.set(timeLogs);

        // eslint-disable-next-line
        this.setState({ timeLogs }); // TODO: use redux
    }

    canStop () : boolean {
        const { timeLogs } = this.state;

        return timeLogs.length > 0 && typeof timeLogs[timeLogs.length - 1].Stop === "undefined";
    }

    handleLocation (elem) : void {
        this.setState({ location: elem.target.value });
    }

    render () : React.ReactNode {
        const { locationOptions } = this.state;

        return (

            // eslint-disable-next-line
            // TODO: use icons instead of button labels
            <div className="justify-content-center">
                <div>
                    <span>
                        {labelLocation}
                    </span>
                    <Form.Select
                        onChange={this.handleLocation}
                        size="sm"
                    >
                        {locationOptions}
                    </Form.Select>
                </div>
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

export default connector(Player);
