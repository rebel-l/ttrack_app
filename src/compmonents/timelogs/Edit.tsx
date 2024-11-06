import "./Edit.scss";

import React from "react";
import {TimeLog} from "../../models/TimeLog";
import {Button, Form} from "react-bootstrap";
import {Locations} from "../../models/Location";
import {Reasons} from "../../models/Reason";
import {save, SaveFunc} from "../../service/timelogs";
import {connect, InferableComponentEnhancerWithProps} from "react-redux";

interface IProps {
    timeLog: TimeLog;
    readonly save: SaveFunc;
}

interface IState {
    locationOptions: React.ReactNode[];
    reasonOptions: React.ReactNode[];
    timeLog: TimeLog;
}

const
    copyTimeLog = (timeLog: TimeLog): TimeLog => {
        return {
            ID: timeLog.ID,
            Start: timeLog.Start,
            Stop: timeLog.Stop,
            Location: timeLog.Location,
            Reason: timeLog.Reason,
            CreatedAt: timeLog.CreatedAt,
            ModifiedAt: timeLog.ModifiedAt
        } as TimeLog
    },
    mapDispatchToProps = {save},
    connector : InferableComponentEnhancerWithProps<any, any> = connect(null, mapDispatchToProps);

class Edit extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);

        const locationOptions: React.ReactNode[] = [];
        Locations.forEach((value: string): void => {
            const item = (
                <option key={value}>
                    {value}
                </option>
            );

            locationOptions.push(item);
        });

        const reasonOptions: React.ReactNode[] = [];
        Reasons.forEach((value: string): void => {
            const item = (
                <option key={value}>
                    {value}
                </option>
            );

            reasonOptions.push(item);
        });

        // Initial state
        this.state = {
            locationOptions,
            reasonOptions,
            timeLog: this.props.timeLog
        };

        // bindings
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLocation = this.handleLocation.bind(this);
        this.handleReason = this.handleReason.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
    }

    handleSubmit(event: any): void {
        event.preventDefault();
        this.props.save(this.state.timeLog, true);
    }

    handleLocation(elem: React.FormEvent<HTMLSelectElement>): void {
        const {locationOptions, reasonOptions} = this.state;

        let timeLog = copyTimeLog(this.state.timeLog);
        timeLog.Location = elem.currentTarget.value;

        this.setState({
            locationOptions,
            reasonOptions,
            timeLog
        })
    }

    handleReason(elem: React.FormEvent<HTMLSelectElement>): void {
        const {locationOptions, reasonOptions} = this.state;

        let timeLog = copyTimeLog(this.state.timeLog);
        timeLog.Reason = elem.currentTarget.value;

        this.setState({
            locationOptions,
            reasonOptions,
            timeLog
        })
    }

    handleStart(elem: React.FormEvent<HTMLInputElement>): void {
        const {locationOptions, reasonOptions} = this.state;

        let timeLog = copyTimeLog(this.state.timeLog);
        timeLog.Start = elem.currentTarget.value;

        this.setState({
            locationOptions,
            reasonOptions,
            timeLog
        })
    }

    handleStop(elem: React.FormEvent<HTMLInputElement>): void {
        const {locationOptions, reasonOptions} = this.state;

        let timeLog = copyTimeLog(this.state.timeLog);
        timeLog.Stop = elem.currentTarget.value;

        this.setState({
            locationOptions,
            reasonOptions,
            timeLog
        })
    }

    render() {
        const { locationOptions, reasonOptions } = this.state;

        return (
            <div>
                <h1>Edit</h1>
                <Form onSubmit={this.handleSubmit}>
                    <label>ID:</label><input name={"id"} value={this.state.timeLog.ID} readOnly={true}/><br/>
                    <label>Start:</label><input name={"start"} value={this.state.timeLog.Start} onChange={this.handleStart}/><br/>
                    <label>Stop:</label><input name={"stop"} value={this.state.timeLog.Stop} onChange={this.handleStop}/><br/>
                    <label>Reason:</label><Form.Select
                        name={"reason"}
                        size={"sm"}
                        defaultValue={this.state.timeLog.Reason}
                        onChange={this.handleReason}
                    >
                        {reasonOptions}
                    </Form.Select><br/>
                    <label>Location:</label><Form.Select
                        name={"location"}
                        size={"sm"}
                        defaultValue={this.state.timeLog.Location}
                        onChange={this.handleLocation}
                    >
                        {locationOptions}
                    </Form.Select><br/>
                    <Button type={"submit"} onClick={this.handleSubmit}>Save</Button>
                </Form>
            </div>
        );
    }
}

export default connector(Edit);