import "./List.scss";

import React from "react";
import {Button, Table} from "react-bootstrap";
import { TimeLogs } from "../../models/TimeLogs";
import Edit from "../timelogs/Edit";
import {DeleteFunc, del} from "../../service/timelogs";
import {connect, InferableComponentEnhancerWithProps} from "react-redux";

interface IProps {
    readonly timeLogs: TimeLogs;
    del: DeleteFunc;
}

interface IState {
    edit: string;
}

// eslint-disable-next-line no-warning-comments
// TODO: add to lib
const numDigits = 2,
    pad = (num, size) => {
        let val = num.toString();

        while (val.length < size) {
            val = `0${val}`;
        }

        return val;
    },
    initialState = {edit: ""} as IState,
    mapDispatchToProps = {del},
    connector : InferableComponentEnhancerWithProps<any, any> = connect(null, mapDispatchToProps);;

class List extends React.Component<IProps, IState> {
    constructor(props: IProps, state = initialState) {
        super(props);

        this.state = state;

        // bindings
        this.onClose = this.onClose.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    shouldComponentUpdate () : boolean {
        return true;
    }

    onEdit(event) {
        this.setState({edit: event.currentTarget.value});
    }

    onDelete(event) {
        this.props.del(event.currentTarget.value);
    }

    onClose(){
        this.setState(initialState);
    }

    render () : React.ReactNode { // eslint-disable-line max-lines-per-function
        const { timeLogs } = this.props;

        return (
            <div>
                <Table>
                    <thead>
                    <tr>
                        <th scope="col">
                            Start
                        </th>
                        <th scope="col">
                            Reason
                        </th>
                        <th scope="col">
                            Stop
                        </th>
                        <th scope="col">
                            Location
                        </th>
                        <th scope="col">
                            Duration
                        </th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {timeLogs.map((timeLog, index) => {
                            let start = "";

                            if (timeLog.Start) {
                                start = new Date(timeLog.Start).toLocaleString();
                            }

                            let stop = ""; // eslint-disable-line one-var

                            if (timeLog.Stop) {
                                stop = new Date(timeLog.Stop).toLocaleString();
                            }

                            let duration = "00:00:00"; // eslint-disable-line one-var

                            if (timeLog.Start && timeLog.Stop) {
                                const time = new Date(new Date(timeLog.Stop).getTime() - new Date(timeLog.Start).getTime());

                                duration = `${pad(time.getUTCHours(), numDigits)}:${pad(time.getUTCMinutes(), numDigits)}:${pad(time.getUTCSeconds(), numDigits)}`; // eslint-disable-line max-len
                            }

                            return (
                                <tr key={`row-${index}`}>
                                    <td key={`start-${index}`}>
                                        {start}
                                    </td>
                                    <td key={`reason-${index}`}>
                                        {timeLog.Reason}
                                    </td>
                                    <td key={`stop-${index}`}>
                                        {stop}
                                    </td>
                                    <td key={`location-${index}`}>
                                        {timeLog.Location}
                                    </td>
                                    <td key={`duration-${index}`}>
                                        {duration}
                                    </td>
                                    <td key={`edit-${index}`}>
                                        <Button key={`edit-button-${index}`} value={timeLog.ID} onClick={this.onEdit}>
                                            Edit
                                        </Button>
                                    </td>
                                    <td key={`delete-${index}`}>
                                        <Button key={`delete-button-${index}`} value={timeLog.ID} onClick={this.onDelete}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                {timeLogs.map((timeLog) => {
                    if (this.state.edit === timeLog.ID) {
                        return (
                            <div key={"edit-popup"} className={"popup"}>
                                <Button onClick={this.onClose}>Close</Button>
                                <Edit timeLog={timeLog} />
                            </div>
                        )
                    }

                    return ("");
                })}
            </div>
        );
    }
}

export default connector(List);
