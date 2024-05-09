import "./Reports.scss";

import { Form } from "react-bootstrap";

import React from "react";
import { connect, InferableComponentEnhancerWithProps } from "react-redux";
import { List, Options } from "../../models/Reports";
import { loadReportOptions, loadReport, LoadReportOptionsFunc, LoadReportFunc } from "../../service/reports";
import { RootState } from "../../redux/store";
import { selectOptions, selectList } from "../../redux/reports";
import ListComp from "./List";


const
    labelOptions: string = "Available Years",
    labelDefaultOption: string = "-- select a year --",
    defaultOption =
        (<option key={0}
            className="inactive"
        >
            {labelDefaultOption}
         </option>),
    mapDispatchToProps = {
        loadReportOptions,
        loadReport,
    },
    mapStateToProps = (state: RootState) => ({
        options: selectOptions(state),
        list: selectList(state),
    }),
    connector : InferableComponentEnhancerWithProps<any, any> = connect(mapStateToProps, mapDispatchToProps);

interface IProps {
    readonly loadReportOptions: LoadReportOptionsFunc;
    readonly loadReport: LoadReportFunc;
    readonly options: Options;
    readonly list: List;
}

class ReportsComp extends React.Component<IProps, any> {
    constructor (props: IProps) {
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
        const year = elem.currentTarget.value;

        if (year === labelDefaultOption) {
            return;
        }

        this.props.loadReport(Number(year));
    }

    render () {
        const { options, list } = this.props,

            reportOptions: React.ReactNode[] = [];

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
                    <span>
                        {labelOptions}
                    </span>
                    <Form.Select size="sm"
                        onChange={this.handleOption}
                    >
                        {reportOptions}
                    </Form.Select>
                </div>
                <ListComp list={list} />
            </div>
        );
    }
}

export default connector(ReportsComp);
