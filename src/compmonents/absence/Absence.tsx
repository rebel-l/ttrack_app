import React from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import { Button, Form } from "react-bootstrap";
import { connect, InferableComponentEnhancerWithProps } from "react-redux";
import { Reasons, Vacation, convertAbsenceToTimeLogs, Absence } from "../../models/Absence";
import { TimeLog } from "../../models/TimeLog";
import { TimeLogs } from "../../models/TimeLogs";
import { save } from "../../service/timelogs";


interface IState {
    range: Absence;
    reason: string;
    reasonOptions: React.ReactNode[];
}

const
    labelReason = "Reason",
    labelAdd = "Add",
    mapDispatchToProps = {
        save,
    },
    connector : InferableComponentEnhancerWithProps<any, any> = connect(null, mapDispatchToProps);

class AbsenceComp extends React.Component<any, IState> {
    constructor (props: any) {
        super(props);

        const reasonOptions: React.ReactNode[] = [];

        Reasons.forEach((value: string) => {
            const item = (
                <option key={value}>
                    {value}
                </option>
            );

            reasonOptions.push(item);
        });

        // Initial state
        this.state = {
            range: [new Date(), new Date()] as Absence,
            reason: Vacation,
            reasonOptions,
        };

        // Bindings
        this.handleAdd = this.handleAdd.bind(this);
        this.handleReason = this.handleReason.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    shouldComponentUpdate (): boolean {
        return true;
    }

    handleAdd () {
        const timeLogs : TimeLogs = convertAbsenceToTimeLogs(this.state.reason, this.state.range);

        timeLogs.forEach((value: TimeLog) => {
            this.props.save(value, true); // eslint-disable-line react/destructuring-assignment
        });
    }

    handleReason (elem: React.FormEvent<HTMLSelectElement>): void {
        this.setState({ reason: elem.currentTarget.value });
    }

    onChange (value: Absence)  {
        this.setState({ range: value });
    }

    render () {
        const { reasonOptions } = this.state;

        return (
            <div className="justify-content-center">
                <div>
                    <span>
                        {labelReason}
                    </span>
                    <Form.Select
                        onChange={this.handleReason}
                        size="sm"
                        defaultValue={this.state.reason}
                    >
                        {reasonOptions}
                    </Form.Select>
                </div>
                <div>
                    <DateRangePicker format={"dd.MM.y"} onChange={this.onChange} value={this.state.range} />
                </div>
                <div className="justify-content-center">
                    <Button
                        onClick={this.handleAdd}
                        size="lg"
                        variant={"primary"}
                    >
                        {labelAdd}
                    </Button>
                </div>
            </div>
        );
    }
}

export default connector(AbsenceComp);
