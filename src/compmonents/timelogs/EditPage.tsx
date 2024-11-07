import React from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import {Absence} from "../../models/Absence";
import {loadByDateRange, LoadByDateRangeFunc} from "../../service/timelogs";
import { sqlDate } from "../../libs/DateTime";
import {connect, InferableComponentEnhancerWithProps} from "react-redux";
import {RootState} from "../../redux/store";
import {selectTimeLogs} from "../../redux/timelogs";
import {TimeLogs} from "../../models/TimeLogs";
import List from "../list/List";

interface IState {
    range: Absence;
 }

interface IProps {
    readonly loadByDateRange: LoadByDateRangeFunc;
    readonly timeLogs: TimeLogs;
}

const  mapDispatchToProps = {
        loadByDateRange,
    },
    mapStateToProps = (state: RootState) => ({ timeLogs: selectTimeLogs(state) }),
    connector : InferableComponentEnhancerWithProps<any, any> = connect(mapStateToProps, mapDispatchToProps);

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
        const { timeLogs } = this.props,
            {range} = this.state;

        return (
            <div className="justify-content-center">
                <div>
                    <DateRangePicker format="dd.MM.y" onChange={this.onChange} value={this.state.range}/>
                </div>
                <List timeLogs={timeLogs} start={sqlDate(range[0])} stop={sqlDate(range[1])} />
            </div>
        );
    }
}

export default connector(EditPage);
