import React from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import { Button, Form } from "react-bootstrap";
import { Reasons, Vacation } from "../../models/Absence";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
interface IState {
    range: Value;
    reason: string;
    reasonOptions: React.ReactNode[];
}

const
    labelReason = "Reason",
    labelAdd = "Add";

class Abesence extends React.Component<any, IState> {
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
            range: [new Date(), new Date()] as Value,
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
        // TODO: create working days for range and send to backend
        console.log(this.state);
        console.log("ADD");
    }

    handleReason (elem: React.FormEvent<HTMLSelectElement>): void {
        this.setState({ reason: elem.currentTarget.value });
    }

    onChange (value: Value)  {
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

export default Abesence;
