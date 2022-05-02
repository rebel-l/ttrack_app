import React from "react";
import { Table } from "react-bootstrap";
import { TimeLogs } from "../../models/TimeLogs";

interface IProps {
    timeLogs: TimeLogs
}

class Player extends React.Component<IProps> {
    constructor (props: IProps) {
        super(props);
    }

    render () : React.ReactNode {
        const { timeLogs } = this.props;

        return (
            <Table>
                <thead>
                    <tr>
                        <th scope={"col"}>Start</th>
                        <th scope={"col"}>Reason</th>
                        <th scope={"col"}>Stop</th>
                        <th scope={"col"}>Location</th>
                        <th scope={"col"}>Duration</th>
                    </tr>
                </thead>
                <tbody>
                {timeLogs.map((timeLog, index) => {
                    let start = "";
                    if (timeLog.Start) {
                        start = new Date(timeLog.Start).toLocaleString()
                    }

                    let stop = "";
                    if (timeLog.Stop) {
                        stop = new Date(timeLog.Stop).toLocaleString()
                    }

                    let duration = "00:00:00";
                    if (timeLog.Start && timeLog.Stop) {
                        const time = new Date(new Date(timeLog.Stop).getTime() - new Date(timeLog.Start).getTime() );
                        duration = pad(time.getUTCHours(), 2) + ":" + pad(time.getUTCMinutes(), 2) + ":" + pad(time.getUTCSeconds(), 2)
                    }

                    return (
                        <tr>
                            <td key={"start-" + index}>{start}</td>
                            <td key={"reason-" + index}>{timeLog.Reason}</td>
                            <td key={"stop-" + index}>{stop}</td>
                            <td key={"location-" + index}>{timeLog.Location}</td>
                            <td key={"duration-" + index}>{duration}</td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        )
    }
}

// TODO: add to lib
const pad = (num, size) => {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

export default Player;
