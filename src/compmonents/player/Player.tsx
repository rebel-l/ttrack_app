import "./Player.scss";

import { Break, Work } from "../../models/Reason";
import { Button, Form } from "react-bootstrap";
import { clone, TimeLogs } from "../../models/TimeLogs";
import { loadByDateRange, LoadByDateRangeFunc, save, SaveFunc } from "../../service/timelogs";
import { selectTimeLogs } from "../../redux/timelogs";

import { Home, Locations } from "../../models/Location";
import React from "react";
import { connect, InferableComponentEnhancerWithProps } from "react-redux";
import { RootState } from "../../redux/store";
import { TimeLog } from "../../models/TimeLog";
import List from "../list/List";
import { Day, sqlDate } from "../../libs/DateTime";

const buttonVariant = (canCLick: boolean): string => {
        let variant : string = "primary";

        if (!canCLick) {
            variant = "secondary";
        }

        return variant;
    },
    labelBreak : string = "Break",
    labelLocation : string = "Working from: ",
    labelStart : string = "Start",
    labelStop : string = "Stop",
    mapDispatchToProps = {
        loadByDateRange,
        save,
    },
    mapStateToProps = (state: RootState) => ({ timeLogs: selectTimeLogs(state) }),
    connector : InferableComponentEnhancerWithProps<any, any> = connect(mapStateToProps, mapDispatchToProps);

interface IState {
    location: string;
    locationOptions: React.ReactNode[];
    start: string;
    stop: string;
}

interface IProps {
    readonly loadByDateRange: LoadByDateRangeFunc;
    readonly save: SaveFunc;
    readonly timeLogs: TimeLogs;
}

class Player extends React.Component<IProps, IState> {
    constructor (props: IProps) {
        super(props);

        const locationOptions: React.ReactNode[] = [];

        Locations.forEach((value: string) => {
            const item = (
                <option key={value}>
                    {value}
                </option>
            );

            locationOptions.push(item);
        });

        // Initial state
        const
            today = new Date(),
            tomorrow = new Date(today.getTime() + Day);

        this.state = {
            location: Home,
            locationOptions,
            start: sqlDate(today),
            stop: sqlDate(tomorrow)
        };

        // Bindings
        this.handleLocation = this.handleLocation.bind(this);

        this.handleBreak = this.handleBreak.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);

        this.canBreak = this.canBreak.bind(this);
        this.canStart = this.canStart.bind(this);
        this.canStop = this.canStop.bind(this);
    }

    shouldComponentUpdate (): boolean {
        return true;
    }

    componentDidMount (): void {
        const {start, stop} = this.state;
        this.props.loadByDateRange(start, stop);
    }

    handleBreak (): void {
        const { location } = this.state,
            timeLogs: TimeLogs = clone(this.props.timeLogs); // eslint-disable-line react/destructuring-assignment

        if (!this.canBreak()) {
            return;
        }

        timeLogs[timeLogs.length - 1].Stop = new Date().toISOString();

        timeLogs.push({
            Start: new Date().toISOString(),
            Reason: Break,
            Location: location,
        });

        this.save(timeLogs);
    }

    canBreak (): boolean {
        const
            { timeLogs } = this.props,
            last = timeLogs[timeLogs.length - 1];

        return timeLogs.length > 0 && typeof last.Stop === "undefined" && last.Reason !== "break";
    }

    handleStart (): void {
        const { location } = this.state,
            timeLogs: TimeLogs = clone(this.props.timeLogs); // eslint-disable-line react/destructuring-assignment

        if (!this.canStart()) {
            return;
        }

        if (timeLogs.length > 0) {
            const last = timeLogs[timeLogs.length - 1];

            if (typeof last.Stop === "undefined" && last.Reason === "break") {
                last.Stop = new Date().toISOString();
            }
        }

        timeLogs.push({
            Start: new Date().toISOString(),
            Reason: Work,
            Location: location,
        });

        this.save(timeLogs);
    }

    canStart (): boolean {
        const
            { timeLogs } = this.props,
            last = timeLogs[timeLogs.length - 1];

        return timeLogs.length === 0 || typeof last.Stop !== "undefined" || last.Reason === "break";
    }

    handleStop (): void {
        const timeLogs: TimeLogs = clone(this.props.timeLogs); // eslint-disable-line react/destructuring-assignment

        if (!this.canStop()) {
            return;
        }

        timeLogs[timeLogs.length - 1].Stop = new Date().toISOString();

        this.save(timeLogs);
    }

    canStop (): boolean {
        const { timeLogs } = this.props;

        return timeLogs.length > 0 && typeof timeLogs[timeLogs.length - 1].Stop === "undefined";
    }

    handleLocation (elem: React.FormEvent<HTMLSelectElement>): void {
        this.setState({ location: elem.currentTarget.value });
    }

    save (values: TimeLogs): void {
        values.forEach((value: TimeLog) => {
            this.props.save(value); // eslint-disable-line react/destructuring-assignment
        });
    }

    render (): React.ReactNode {
        const { locationOptions, start, stop } = this.state,
            { timeLogs } = this.props;

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
                        defaultValue={this.state.location}
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
                <List timeLogs={timeLogs} start={start} stop={stop} />
            </div>
        );
    }
}

export default connector(Player);
