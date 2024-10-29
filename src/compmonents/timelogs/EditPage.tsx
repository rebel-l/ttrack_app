import React from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import {Absence} from "../../models/Absence";

interface IState {
    range: Absence;
 }

class EditPage extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);

        // Initial state
        this.state = {
            range: [
                new Date(),
                new Date(),
            ]
        }

        // bindings
        this.onChange = this.onChange.bind(this);
    }

    onChange(value: Absence) {
        this.setState({range: value});
        console.log("Hello", value);
    }

    render() {
        return (
            <div className="justify-content-center">
                <div>
                    <DateRangePicker format="dd.MM.y" onChange={this.onChange} value={this.state.range}/>
                </div>
            </div>
        );
    }
}

export default EditPage;
