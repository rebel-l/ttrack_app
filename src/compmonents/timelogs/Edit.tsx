import React from "react";
import {TimeLog} from "../../models/TimeLog";
import {Form} from "react-bootstrap";

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
                <Form>
                    <label>ID:</label><input value={this.props.timeLog.ID} readOnly={true}/>
                </Form>
            </div>
        );
    }
}

export default Edit;