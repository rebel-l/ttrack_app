import "./Reports.scss";

import { Form } from "react-bootstrap";

import React from "react";
import { connect, InferableComponentEnhancerWithProps } from "react-redux";
import { loadReportOptions } from "../../service/reports";
import { RootState } from "../../redux/store";
import { selectOptions } from "../../redux/reports";

const
    labelOptions: string = "Available Years",
    defaultOption = (
        <option key={0} className={"inactive"}>-- select a year --</option>
    ),
    mapDispatchToProps = {
        loadReportOptions,
    },
    mapStateToProps = (state: RootState) => ({options: selectOptions(state)}),
    connector : InferableComponentEnhancerWithProps<any, any> = connect(mapStateToProps, mapDispatchToProps);

class ReportsComp extends React.Component<any, any> {
    constructor (props: any) {
        super(props);

        // Bindings
        this.handleOption = this.handleOption.bind(this);
    }

    shouldComponentUpdate (): boolean {
        return true;
    }

    componentDidMount (): void {
        this.props.loadReportOptions();
    }

    handleOption (elem: React.FormEvent<HTMLSelectElement>): void {
        console.log(elem.currentTarget.value);
    }

    render () {
        const { options } = this.props;

        const reportOptions: React.ReactNode[] = [];
        reportOptions.push(defaultOption);
        options.forEach((value: number) => {
            const item = (
                <option key={value}>
                    {value}
                </option>
            );

            reportOptions.push(item);
        });

        return (
            <div className="justify-content-center">
                <div>
                    <span>{labelOptions}</span>
                    <Form.Select size="sm" onChange={this.handleOption}>
                        {reportOptions}
                    </Form.Select>
                </div>
            </div>
        );
    }
}

export default connector(ReportsComp);