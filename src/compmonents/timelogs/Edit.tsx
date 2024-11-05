import "./Edit.scss";

import React from "react";
import {TimeLog} from "../../models/TimeLog";
import {Button, Form} from "react-bootstrap";
import {Locations} from "../../models/Location";

interface IProps {
    timeLog: TimeLog;
}

interface IState {
    locationOptions: React.ReactNode[];
    timeLog: TimeLog;
}

const copyTimeLog = (timeLog: TimeLog): TimeLog => {
    return {
        ID: timeLog.ID,
        Start: timeLog.Start,
        Stop: timeLog.Stop,
        Location: timeLog.Location,
        Reason: timeLog.Reason,
        CreatedAt: timeLog.CreatedAt,
        ModifiedAt: timeLog.ModifiedAt
    } as TimeLog
}

class Edit extends React.Component<IProps, IState>{
    constructor(props: IProps) {
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
        this.state = {
            locationOptions,
            timeLog: this.props.timeLog
        };

        // bindings
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLocation = this.handleLocation.bind(this);
    }

    handleSubmit(event): void {
        event.preventDefault();
        console.log(this.state.timeLog);
    }

    handleLocation(elem: React.FormEvent<HTMLSelectElement>): void {
        const {locationOptions} = this.state;
        let timeLog = copyTimeLog(this.state.timeLog);
        timeLog.Location = elem.currentTarget.value;

        this.setState({
            locationOptions,
            timeLog
        })
    }

    render() {
        const { locationOptions } = this.state;

        return (
            <div>
                <h1>Edit</h1>
                <Form onSubmit={this.handleSubmit}>
                    <label>ID:</label><input name={"id"} value={this.state.timeLog.ID} readOnly={true}/><br/>
                    <label>Start:</label><input name={"start"} value={this.state.timeLog.Start}/><br/>
                    <label>Stop:</label><input name={"stop"} value={this.state.timeLog.Stop}/><br/>
                    <label>Reason:</label><input name={"reason"} value={this.state.timeLog.Reason}/><br/>
                    <label>Location:</label><Form.Select
                        size="sm"
                        defaultValue={this.state.timeLog.Location}
                        onChange={this.handleLocation}
                    >
                        {locationOptions}
                    </Form.Select><br/>
                    <Button type={"submit"} onClick={this.handleSubmit}>save</Button>
                </Form>
            </div>
        );
    }
}

export default Edit;