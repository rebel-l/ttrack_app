import React from "react";
import {Button, Table} from "react-bootstrap";
import { TimeLogs } from "../../models/TimeLogs";

interface IProps {
    readonly timeLogs: TimeLogs
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
    };

class List extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);

        // bindings
        this.onEdit = this.onEdit.bind(this);
    }

    shouldComponentUpdate () : boolean {
        return true;
    }

    onEdit(event) {
        console.log(event.currentTarget.value);
    }

    render () : React.ReactNode { // eslint-disable-line max-lines-per-function
        const { timeLogs } = this.props;

        return (
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
                                <td>
                                    <Button value={timeLog.ID} onClick={this.onEdit}>
                                        edit
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    }
}

export default List;
