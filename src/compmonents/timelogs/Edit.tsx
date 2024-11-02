import React from "react";
import {TimeLog} from "../../models/TimeLog";

interface IProps {
    timeLog: TimeLog;
}

class Edit extends React.Component<IProps, any>{
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Edit</h1>
                <p>{this.props.timeLog.ID}</p>
            </div>
        );
    }
}

export default Edit;