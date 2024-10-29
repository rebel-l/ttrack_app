import React from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import {Absence} from "../../models/Absence";
import {loadByDateRange, LoadByDateRangeFunc} from "../../service/timelogs";
import { sqlDate } from "../../libs/DateTime";
import {connect, InferableComponentEnhancerWithProps} from "react-redux";

interface IState {
    range: Absence;
 }

interface IProps {
    readonly loadByDateRange: LoadByDateRangeFunc;
}

const  mapDispatchToProps = {
    loadByDateRange,
},
    connector : InferableComponentEnhancerWithProps<any, any> = connect(null, mapDispatchToProps);

class EditPage extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        // Initial state
        this.state = {
            range: [
                new Date(),
                new Date(),
            ] as Absence
        }

        // bindings
        this.onChange = this.onChange.bind(this);
    }

    onChange(value: Absence) {
        this.setState({range: value});
        this.props.loadByDateRange(sqlDate(value[0]), sqlDate(value[1]));
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

export default connector(EditPage);
